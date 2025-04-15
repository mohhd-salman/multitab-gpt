// background.js runs in the background as a service worker

chrome.runtime.onInstalled.addListener(() => {
    console.log('MultiTab GPT Extension Installed!');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('MultiTab GPT Extension Started!');
});
