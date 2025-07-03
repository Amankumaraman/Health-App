import fitz  # PyMuPDF
from PIL import Image
import io
import re
from google.cloud import vision
from google.oauth2 import service_account
from ai_summary import generate_health_summary ,parse_ai_summary_for_flags # 👈 call AI here

# ✅ Load Google Vision credentials
VISION_CREDENTIALS = service_account.Credentials.from_service_account_file(
    "Credentials.json"
)

# ✅ Google Vision OCR
def extract_text_from_image_google(image_bytes):
    client = vision.ImageAnnotatorClient(credentials=VISION_CREDENTIALS)
    image = vision.Image(content=image_bytes)
    response = client.text_detection(image=image)
    texts = response.text_annotations
    if texts:
        return texts[0].description
    return ""

# ✅ Core OCR text extractor
def extract_text(file_bytes, filename):
    text = ""
    if filename.endswith(".pdf"):
        pdf = fitz.open(stream=file_bytes, filetype="pdf")
        for page in pdf:
            page_text = page.get_text().strip()
            if not page_text:  # Fallback to Vision OCR
                pix = page.get_pixmap(dpi=300)
                image_bytes = pix.tobytes("png")
                page_text = extract_text_from_image_google(image_bytes)
            text += page_text + "\n"
        pdf.close()
    else:
        text = extract_text_from_image_google(file_bytes)
    return text

# ✅ Regex parser for health data
import re

def extract_health_parameters(text):
    pattern = r"([A-Za-z ()/-]+)\s+(\d+\.?\d*)\s*([a-zA-Z%/]+)?\s*\(?(\d+\.?\d*)?-?(\d+\.?\d*)?\)?"
    matches = re.findall(pattern, text)

    exclude_keywords = {"page", "image", "report", "no", "id"}

    results = []

    for match in matches:
        name, value, unit, min_range, max_range = match
        name_clean = name.strip().lower()

        # Skip junk entries
        if any(ex in name_clean for ex in exclude_keywords):
            continue

        try:
            val = float(value)
            min_val = float(min_range) if min_range else None
            max_val = float(max_range) if max_range else None

            status = "Normal"
            borderline = False

            if (min_val is not None and val < min_val) or (max_val is not None and val > max_val):
                status = "Needs Attention"
            elif (min_val is not None and min_val * 0.95 <= val <= min_val) or \
                 (max_val is not None and max_val <= val <= max_val * 1.05):
                borderline = True
                status = "Borderline"

            # Mark specific ones as "Normal but Important"
            important_params = {"vitamin d", "gfr", "ldl", "hdl", "vitamin b12"}
            if status == "Normal" and any(key in name_clean for key in important_params):
                status = "Normal Important"

            results.append({
                "parameter": name.strip(),
                "value": val,
                "unit": unit,
                "range": f"{min_range or ''}-{max_range or ''}",
                "status": status
            })

        except ValueError:
            continue

    return results


# ✅ Unified processing flow: OCR → regex → AI
def process_report(file_bytes, filename):
    text = extract_text(file_bytes, filename)
    data = extract_health_parameters(text)

    if not data:
        ai_summary = "✅ All health parameters appear normal. No immediate attention is needed."
        flagged_data = []
    else:
        ai_summary = generate_health_summary(data)
        flagged_data = parse_ai_summary_for_flags(ai_summary)

    return {
        "data": data,
        "ai_summary": ai_summary,
        "flagged_data": flagged_data,
    }

