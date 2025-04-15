const tabsListDiv = document.getElementById('tabsList');
const summarizeBtn = document.getElementById('summarizeTabs');
const outputDiv = document.getElementById('output');
const exportSection = document.getElementById('exportSection');
const copyBtn = document.getElementById('copyBtn');
const txtBtn = document.getElementById('txtBtn');
const statusText = document.getElementById('status');

let selectedTabIds = [];

function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

async function loadTabs() {
    const tabs = await chrome.tabs.query({});
    tabsListDiv.innerHTML = "";

    const selectAllDiv = document.createElement('div');
    selectAllDiv.classList.add('mb-2', 'border-b', 'pb-2');
    selectAllDiv.innerHTML = `
        <label class="flex items-center gap-2 font-semibold text-white">
            <input type="checkbox" id="selectAllTabs">
            Select All Tabs
        </label>
    `;
    tabsListDiv.appendChild(selectAllDiv);

    tabs.forEach((tab) => {
        const url = new URL(tab.url);
        const domain = url.hostname.replace("www.", "");

        const div = document.createElement('div');
        div.classList.add('mb-1');

        div.innerHTML = `
            <label class="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" value="${tab.id}" class="tabCheckbox">
                <img src="${tab.favIconUrl || 'https://www.google.com/s2/favicons?domain=' + url.hostname}" class="w-4 h-4" />
                <span class="truncate max-w-[200px]">${domain} — ${tab.title}</span>
            </label>
        `;

        tabsListDiv.appendChild(div);
    });

    document.getElementById('selectAllTabs').addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.tabCheckbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
    });
}

loadTabs();

summarizeBtn.addEventListener('click', async () => {
    const checkedBoxes = document.querySelectorAll('.tabCheckbox:checked');
    selectedTabIds = Array.from(checkedBoxes).map(cb => parseInt(cb.value));

    if (selectedTabIds.length === 0) {
        alert("Please select at least one tab.");
        return;
    }

    outputDiv.classList.add('hidden');
    exportSection.classList.add('hidden');
    statusText.innerHTML = `<span class="loader"></span> Summarizing...`;

    let summaries = [];

    for (const tabId of selectedTabIds) {
        try {
            const tabInfo = await chrome.tabs.get(tabId);
            const url = new URL(tabInfo.url);
            const domain = url.hostname.replace("www.", "");

            const [result] = await chrome.scripting.executeScript({
                target: { tabId },
                func: () => document.body.innerText
            });

            const content = result.result;
            const summary = await summarizeWithHuggingface(content);
            const wordCount = countWords(summary);

            summaries.push({
                domain,
                title: tabInfo.title,
                summary,
                wordCount,
            });

        } catch (error) {
            console.error(`Error summarizing tab ${tabId}:`, error);
        }
    }

    outputDiv.innerHTML = summaries.map(s => `
        <div class="bg-slate-800 text-slate-100 p-3 rounded-xl shadow mb-0.5 border border-slate-700">
            <div class="text-xs text-blue-400 mb-0.5">🔗 ${s.domain}</div>
            <div class="text-sm font-semibold mb-0.5">${s.title}</div>
            <div class="text-xs text-gray-400 mb-1">📝 Word Count: ${s.wordCount}</div>
            <div class="text-sm leading-relaxed whitespace-pre-wrap text-slate-200">${s.summary}</div>
        </div>
    `).join('');    

    outputDiv.classList.remove('hidden');
    exportSection.classList.remove('hidden');
    statusText.innerHTML = `✅ Summarization Complete`;
});

// Export Features
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputDiv.innerText);
    alert('Copied to Clipboard!');
});

txtBtn.addEventListener('click', () => {
    downloadAsTxt(outputDiv.innerText);
});
