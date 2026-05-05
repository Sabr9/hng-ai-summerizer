//This is the "Worker" that lives inside the webpage and grabs the text.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract") {
        const text = document.querySelector('article')?.innerText || document.body.innerText;
        sendResponse({ text: text.substring(0, 4000) });
    }
});