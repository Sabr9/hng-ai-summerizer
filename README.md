# HNG AI Page Summarizer (Stage 4A)

A Manifest V3 Chrome Extension that extracts meaningful content from the current webpage and generates a structured summary with estimated reading time.

## Setup Instructions
1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle at the top right).
4. Click **Load unpacked** and select the folder containing these files.
5. Go to any article (e.g., Wikipedia) and **Refresh the page**.
6. Click the extension icon in your toolbar and hit **Summarize**.

## Architecture
This extension follows a modular **Manifest V3** architecture:
*   **Content Script (`content.js`):** Injected into the webpage to extract the main article text while filtering out navigation and sidebar clutter.
*   **Background Service Worker (`background.js`):** Acts as the "brain," handling data processing and secure communication logic to keep the UI responsive.
*   **Popup UI (`index.html` / `popup.js`):** A clean, responsive interface that displays the page title, loading states, and the formatted summary.

## Security Decisions
*   **Credential Protection:** In strict compliance with **Requirement #4**, no API keys are hardcoded in the frontend or committed to the repository. 
*   **Secure Messaging:** All API logic is restricted to the Background Script to prevent exposure and mitigate XSS risks.
*   **Content Sanitization:** Page content is sanitized before being displayed in the popup to ensure a safe user experience.

##  Storage & Performance
*   **Caching Logic:** Implemented `chrome.storage.local` to cache summaries by URL. This prevents redundant API calls, saves tokens, and allows for near-instant loading of previously summarized pages.
*   **Performance:** By offloading the "apiCall" logic to the service worker, the extension maintains a minimal performance footprint on the active tab.

## Trade-offs
*   **Mock Integration:** For this demonstration, a simulated AI response is used in the background worker. This was a strategic decision to ensure a stable, 100% functional demo despite regional API latencies and to guarantee that no secrets are leaked in a public GitHub submission.