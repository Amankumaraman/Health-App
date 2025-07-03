# 🩺 Health-App — AI-Powered Medical Report Analyzer

An end-to-end health report analysis web app that extracts medical parameters from uploaded PDF or image reports, analyzes the data using AI, and displays categorized insights including flagged abnormalities.

---

## 🛠️ Tech Stack

| Layer     | Technology                 |
|-----------|----------------------------|
| Frontend  | React + Vite + TailwindCSS |
| Backend   | FastAPI + PyMuPDF + Google Vision OCR |
| AI Layer  | OpenAI / Groq (LLaMA-3)     |
| Hosting   | Vercel (frontend), Render (backend) |
| Extras    | Axios, Tesseract (fallback), PDF parser |

---

## ✨ Features

- 📤 Upload medical reports in PDF, JPG, or PNG
- 🧠 AI-powered summarization & insights
- 📊 Categorized Key Metrics: Critical, High-risk, Normal
- 📌 Flagged values and explanations
- 🔐 Secure API key handling (via Render Secret Files)
- 🧾 PDF & image OCR extraction (Google Vision or fallback)

---


---

## 🚀 Getting Started (Locally)

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/Amankumaraman/Health-App.git
cd Health-App
````

---

### ⚙️ 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

* Create a `credentials.json` (Google Vision) or set as Secret File on Render
* Run:

```bash
uvicorn main:app --reload
```

---

### 🌐 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000
```

Then run:

```bash
npm run dev
```

---

## 🌍 Deployment

### 🔵 Backend (FastAPI)

Deployed on **Render**:
📡 `https://health-app-38az.onrender.com`

Steps:

* Set environment variable: `OPENAI_API_KEY`
* Upload `credentials.json` as Secret File

---

### 🟣 Frontend (React + Vite)

Deployed on **Vercel**:
🖼️ Add env variable: `VITE_API_BASE_URL=https://health-app-38az.onrender.com`
→ Then **Redeploy**


## 🤖 AI Integration

* Model: `LLaMA 3` or `GPT-4`
* Generates structured summaries like:

  * 🔴 **Critical Abnormalities**
  * 🟠 **High-Risk Values**
  * 🟢 **Clinically Significant Metrics**

---

## 🔐 Security

* `.env` and API keys are **not committed**
* Render Secret Files used for credentials
* Frontend does not expose any private keys

---

## 👨‍💻 Author

**Aman Kumar**
🔗 [Portfolio](https://devaiak.vercel.app/) | [GitHub](https://github.com/Amankumaraman) | [LinkedIn](https://www.linkedin.com/in/aman-kumar-here-for-you/)

---

## 📄 License

MIT — Free to use, modify & distribute.

````

