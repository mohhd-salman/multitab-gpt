// const BACKEND_URL = "http://localhost:8000/summarize";
const BACKEND_URL = "https://multitab-gpt-backend.onrender.com/summarize";


async function summarizeWithGemini(text) {
    const shortText = text.length > 4000 ? text.slice(0, 4000) : text;

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: shortText })
        });

        if (response.status === 429) {
            const error = await response.json();
            alert(error.error);

            // ✅ Disable the button and show limit message
            summarizeBtn.disabled = true;
            summarizeBtn.textContent = "Limit Reached (30/day)";

            return "❗ You've reached your daily limit.";
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", errorText);
            throw new Error("Summarization failed");
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
