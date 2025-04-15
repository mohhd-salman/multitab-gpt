
# MultiTab GPT - Chrome Extension

MultiTab GPT is a Chrome Extension that allows users to select multiple open tabs, summarize their content using AI, and export the final summary.

## Features

- Select multiple open tabs easily
- Summarize each tab's content using FastAPI backend (Huggingface API)
- Clean and minimal dark-mode UI
- Word count for each tab's summary
- Export summaries as .txt file
- Copy to clipboard feature
- Backend securely handles API key
- Free to use with a daily limit of 10 summaries per user

## Backend API Used

This extension uses a FastAPI backend deployed on Render for summarizing content securely.

Backend URL:
```
https://multitab-gpt-backend.onrender.com/summarize
```

## Installation (For Users)

1. Download this repo as ZIP and extract.
2. Open Chrome and go to:
```
chrome://extensions/
```
3. Enable "Developer Mode" (top right corner).
4. Click on "Load unpacked".
5. Select the extracted folder.

That's it! Now you can use MultiTab GPT directly from your browser.

