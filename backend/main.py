from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ocr_utils import process_report

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.post("/upload")
async def upload_report(file: UploadFile = File(...)):
    file_bytes = await file.read()
    result = process_report(file_bytes, file.filename)

    # ✅ Print the full result to the terminal
    print("\n📥 Uploaded File:", file.filename)
    print("📤 Extracted Response:\n", result)

    return result
