# MultiTab GPT - Chrome Extension

**MultiTab GPT** is a productivity-focused Chrome Extension that allows users to select multiple open browser tabs, extract their content, summarize each using AI (Google Gemini via FastAPI), and export the combined result.

---

## 🚀 Features

- ✅ Select multiple open tabs using checkboxes
- ✅ Summarize each tab's visible content using a FastAPI backend (Gemini API)
- ✅ Clean and minimal dark-mode UI built with TailwindCSS
- ✅ View tab title, domain, favicon, and word count for each summary
- ✅ Export final summary as `.txt` file or copy to clipboard
- ✅ Daily usage limit of **30 summaries per user**
- ✅ Secure backend handles all Gemini API calls (API key not exposed)
- ✅ Works without login — ready-to-use after installation

---

## 🧠 Backend API

This extension uses a **FastAPI** backend hosted on **Render**, which securely connects to the **Google Gemini API** for summarization.

**Backend Endpoint**:
```
https://multitab-gpt-backend.onrender.com/summarize
```

---

## 🛠 Installation (for Users)

1. [Download this repository as a ZIP](https://github.com/mohhd-salman/MultiTab-GPT/archive/refs/heads/main.zip) and extract the folder.
2. Open Chrome and visit:
   ```
   chrome://extensions/
   ```
3. Enable **Developer Mode** (top-right toggle).
4. Click on **Load unpacked**.
5. Select the **extracted folder** that contains the extension files.

✅ That's it! Now you can use **MultiTab GPT** directly from your browser toolbar.

---

## 📦 Project Structure (Frontend)

```
├── popup.html          # Extension popup layout
├── popup.js            # Main logic for tab selection & summarization
├── utils.js            # Handles API calls and exports
├── styles.css          # Tailwind-styled dark theme
├── manifest.json       # Chrome Extension config
├── icons/              # App icons (16x16, 48x48, 128x128)
└── libs/               # External libraries (FileSaver.js etc.)
```

---

## ✨ Example Use Case

Imagine you have 10 research articles open across tabs — instead of reading them one by one, just:

1. Click the MultiTab GPT icon
2. Select the tabs you want
3. Click **"Summarize"**
4. Instantly get concise summaries for each tab in one scrollable panel!

---

## 🧠 Technologies Used

**Frontend**: JavaScript, Chrome Extension APIs, TailwindCSS  
**Backend**: FastAPI, Python, Google Gemini API  
**Hosting**: Render (for backend)

---

## 🔐 API & Rate Limit

- Backend rate-limited to **30 summarizations per IP per day**
- Gemini API key is securely stored and never exposed to the frontend

---

### 💡 Contributions and feedback welcome!
