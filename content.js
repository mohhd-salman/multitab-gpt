// content.js

// This file is injected into each selected tab.
// Its job is to extract clean text from the webpage.

(() => {
    const rawText = document.body.innerText;
    const cleanText = rawText.replace(/\s+/g, ' ').trim();
    cleanText;
})();
