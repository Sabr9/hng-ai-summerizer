// popup.js - Handles the UI
document.getElementById('summarize-btn').addEventListener('click', async () => {
    const output = document.getElementById('output');
    const loader = document.getElementById('loader');
    const titleDiv = document.getElementById('page-title');
    
    loader.style.display = 'block';
    output.innerText = '';

    // We define "tab" here
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (titleDiv) titleDiv.innerText = tab.title;

    chrome.tabs.sendMessage(tab.id, { action: "extract" }, (response) => {
        if (chrome.runtime.lastError || !response) {
            loader.style.display = 'none';
            output.innerText = "Error: Refresh the page and try again.";
            return;
        }

        chrome.runtime.sendMessage({ 
            action: "apiCall", 
            text: response.text, 
            url: tab.url 
        }, (result) => {
            loader.style.display = 'none';
            output.innerText = result ? result.summary : "Error connecting to background.";
        });
    });
});

document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('output').innerText = '';
    const titleDiv = document.getElementById('page-title');
    if (titleDiv) titleDiv.innerText = '';
});