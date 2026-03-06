# Travlr Getaways — Express Static Site

## Overview
This repository contains a small **Node.js + Express** application that serves the **Travlr Getaways** static website (HTML/CSS/JS/images). The Express server hosts all client files from the `public/` directory and renders the homepage at `/`.

## Tech Stack
- **Node.js**
- **Express** (web server)
- **Static front-end**: HTML, CSS, JavaScript, images

## Getting Started

### Prerequisites
- Node.js installed (includes `npm`)

### Install
From the project root:

```bash
npm install
```

### Run the server
From the project root:

```bash
node app.js
```

You should see:

```text
Server running at http://localhost:3000
```

Then open:
- `http://localhost:3000`

## Project Structure
Key files/folders:

```text
travlr-app/
├── app.js
├── package.json
├── package-lock.json
├── node_modules/
└── public/
    ├── index.html
    ├── about.html
    ├── contact.html
    ├── news.html
    ├── travel.html
    ├── css/
    ├── js/
    └── images/
```

## How It Works
- **Static hosting**: Express serves everything inside `public/` using `express.static(...)`.
- **Homepage route**: `GET /` returns `public/index.html`.

## Rubric Checklist (Step 2–8)
- **Node project initialized** (`package.json` present)
- **Express installed** (`express` dependency present)
- **Express server created** (`app.js`)
- **Static HTML rendered** (files served from `public/`)
- **Node application runs** (`node app.js` starts successfully)

## Common Troubleshooting
- **Port already in use**: If `3000` is busy, stop the other process using it, or change `port` in `app.js`.
- **Styles/images not loading**:
  - Confirm assets are under `public/` (e.g., `public/css`, `public/images`).
  - Check that your HTML uses correct relative paths (e.g., `css/style.css`, `images/...`).
- **Changes not showing**: Hard refresh the browser (Ctrl+F5) or restart the server.

## Notes for Submission
- The website files provided by the course (unzipped from `travlr.zip`) should be placed inside `public/`.
- This project is intentionally minimal and focused on demonstrating an Express static site server.

