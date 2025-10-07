# Task_weather-app

A small, dependency-free, client-side weather demo built with plain HTML, CSS and JavaScript. The app lives in `index.html` and uses `script.js` for behavior and `style.css` for presentation. It is intended to be run locally in a browser and is easy to extend to call a real weather API.

## What's included
- `index.html` — main UI
- `style.css` — styling
- `script.js` — JavaScript logic

## Prerequisites
- A modern web browser (Chrome, Edge, Firefox, Safari)
- (Optional) Python 3 if you want to run a simple local HTTP server
- (Optional, only if you add automated tests) Node.js and npm

## Setup and run locally

1. Open the project folder (`c:\Task1`) in your file explorer or editor.
2. To run the app, simply open `index.html` in your browser (double-click or "Open with...").

3. (Recommended) Run a lightweight local server to avoid potential CORS/file:// issues. From PowerShell:

```powershell
cd c:\Task1
# Using Python 3's built-in server
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

4. Enter a city or location in the UI and use the app. The repository currently contains demo/placeholder behavior — to fetch real weather data, wire up a weather API in `script.js` and add an API key.

## Tests

There are no automated tests included by default. Below are instructions to add and run a simple unit test setup using Jest (Node-based). If you'd prefer browser/E2E tests (Playwright, Cypress), tell me and I can add those instead.

Add and run Jest tests (one-time setup):

```powershell
cd c:\Task1
npm init -y
npm install --save-dev jest
# Optional: install jsdom if your code depends on DOM APIs during unit tests
npm install --save-dev jsdom

# Add a test script to package.json (or run tests with npx jest)
# In package.json, set: "scripts": { "test": "jest" }

# Create a test file under __tests__/ or tests/ (example: __tests__/script.test.js)
npx jest --init    # (optional) interactive jest setup

# Run tests:
npm test
```

Minimal example test (save as `__tests__/script.test.js`):

```javascript
const fs = require('fs');
const path = require('path');

test('example sanity test', () => {
	expect(1 + 1).toBe(2);
});
```

After adding tests, run `npm test` in the project root. If your code uses DOM APIs, either extract pure functions for testing or use `jsdom`/`@testing-library/dom` to provide a test DOM.

## Assumptions & design choices

- This is a static, client-only demo. No backend or API keys are committed here.
- Dependencies are intentionally zero to keep local setup trivial (open `index.html`).
- Test instructions are provided as optional developer steps instead of adding Node tooling by default so the repository stays lightweight. I can add a minimal Jest setup and one or two unit tests if you want — say the word and I will add them.
- The code layout intentionally uses separate `index.html`, `style.css`, and `script.js` files to keep concerns separated and make the project easy to extend.

## Next steps (optional)

- Integrate a real weather API (OpenWeatherMap or similar). Keep API keys out of source; use environment variables or a small backend to proxy requests.
- Add unit tests (Jest) and a CI workflow to run them on push.
- Add basic E2E tests (Playwright or Cypress) to cover the UI flow.

---

If you'd like, I can now: add a minimal Jest test and package.json script, or add an example of integrating OpenWeatherMap. Tell me which you prefer.
# Task_weather-app# Task_weather-app
