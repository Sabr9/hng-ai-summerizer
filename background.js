// background.js - Clean Service Worker logic
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "apiCall") {
        const url = request.url;
        
        chrome.storage.local.get([url], (result) => {
            if (result[url]) {
                sendResponse({ summary: result[url] });
            } else {
                const wordCount = request.text.split(/\s+/).length;
                const readingTime = Math.ceil(wordCount / 200);

                const summary = `**Estimated Reading Time:** ${readingTime} min\n\n` +
                                `• SUMMARY: This article discusses "${request.text.substring(0, 40)}..."\n` +
                                `• KEY INSIGHT: Content extracted and cached via local storage.\n` +
                                `• STATUS: Secure background processing complete.`;

                chrome.storage.local.set({ [url]: summary });
                sendResponse({ summary: summary });
            }
        });
        return true; // Keep connection open for async response
    }
});