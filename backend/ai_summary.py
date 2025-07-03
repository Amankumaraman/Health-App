import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Get API key from environment variable
openai.api_key = os.getenv("GROQ_API_KEY")
openai.api_base = "https://api.groq.com/openai/v1"
MODEL = "llama3-8b-8192"

def generate_health_summary(parameters):
    prompt = """
You're a medical assistant AI. Analyze these abnormal lab parameters and return:

1. A short bulleted list (max 8 items) of only the most clinically important abnormalities.
2. Each bullet should follow this format: 
   * [Parameter] ([Value]) is [high/low], indicating [brief insight].

3. Follow this with a plain paragraph summarizing possible conditions or concerns and general advice.

Avoid unnecessary headings, markdown, or repetition. Keep it human-readable and medically useful.

Here are the abnormal lab values:
"""

    for p in parameters:
        param = p.get('parameter', '')
        value = p.get('value', '')
        unit = p.get('unit', '')
        range_ = p.get('range', '-')
        prompt += f"- {param}: {value} {unit} (Normal: {range_})\n"

    prompt += "\nReturn only the bullet points and one summary paragraph. No intro, no outro."

    try:
        response = openai.ChatCompletion.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=600,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"❌ AI summary generation failed: {str(e)}"


def parse_ai_summary_for_flags(summary_text):
    import re
    flagged_params = []

    # Match bullet points like *, •, -
    bullet_lines = re.findall(r"[*•\-]\s+(.+?)(?:\n|$)", summary_text)

    for line in bullet_lines:
        print("🔍 Bullet line:", line)  # DEBUG LOG

        # Match patterns like: Parameter (12.5) is high, indicating something.
        match = re.match(
            r"(.+?)\s*\(([\d.,]+)\)\s+is\s+(high|low),\s+indicating\s+(.+)",
            line.strip(),
            re.IGNORECASE
        )
        if match:
            param, value, status, insight = match.groups()
            # Clean value in case it has comma
            value = value.replace(",", "")
            try:
                flagged_params.append({
                    "parameter": param.strip(),
                    "value": float(value),
                    "unit": "",
                    "range": "",
                    "status": "Needs Attention" if status.lower() in ["high", "low"] else "Normal",
                    "insight": insight.strip()
                })
            except ValueError:
                continue

    return flagged_params
