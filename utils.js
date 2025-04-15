// utils.js

// const BACKEND_URL = "http://localhost:8000/summarize";
const BACKEND_URL = "https://multitab-gpt-backend.onrender.com/summarize";


async function summarizeWithHuggingface(text) {
    const shortText = text.slice(0, 1000);

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: shortText })
        });

        if (response.status === 429) {
            const error = await response.json();
            alert(error.error);  
            return "❗ You reached your daily limit.";
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", errorText);
            throw new Error('Summarization failed');
        }

        const data = await response.json();
        return data.summary || "Summary not available.";

    } catch (error) {
        console.error("Fetch Error:", error);
        return "Error summarizing this tab.";
    }
}



function downloadAsTxt(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url: url,
        filename: 'MultiTabGPT_Summary.txt'
    });
}
