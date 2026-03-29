# Travlr Getaways

<img width="1908" height="1003" alt="Screenshot 2026-03-06 003414" src="https://github.com/user-attachments/assets/98463d3c-985f-4dfe-b73e-e248c1232a67" />

## Overview

Travlr Getaways is a full stack web application built with the **MEAN** stack (MongoDB, Express, Angular, Node.js). The application serves two distinct audiences: a customer-facing website that lets visitors browse travel packages, and a secure Single-Page Application (SPA) admin portal where authorized users can add, edit, and delete trips.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Web framework | Express |
| Template engine | Handlebars (HBS) |
| Database | MongoDB + Mongoose |
| Admin SPA | Angular 19 |
| Authentication | JSON Web Tokens (JWT) + bcrypt |
| Password hashing | crypto (PBKDF2) via Mongoose model |

---

## Getting Started

### Prerequisites

- Node.js (v18+) and npm
- MongoDB running locally on port 27017
- Angular CLI (`npm install -g @angular/cli`)

### Install and seed the database

```bash
# From the project root
npm install
node seed.js
```

### Run the Express server

```bash
node app.js
# Server running at http://localhost:3000
```

### Run the Angular admin SPA (development)

```bash
cd travlr
npm install
ng serve
# Admin portal running at http://localhost:4200
```

---

## Project Structure

```text
travlr-app/
├── app.js                    # Express entry point
├── seed.js                   # Database seed script
├── package.json
├── app_api/                  # REST API (JSON)
│   ├── controllers/
│   │   ├── authentication.js # register / login → JWT
│   │   └── trips.js          # CRUD for trips
│   ├── middleware/
│   │   └── authjwt.js        # JWT verification middleware
│   ├── models/
│   │   └── users.js          # User schema with password hashing
│   └── routes/
│       └── index.js          # API route definitions
├── app_server/               # Server-side rendered customer site
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── views/                # Handlebars templates + partials
├── public/                   # Static HTML/CSS/images (customer)
└── travlr/                   # Angular admin SPA
    └── src/app/
        ├── trip-listing/     # Lists all trips
        ├── trip-card/        # Reusable card component
        ├── add-trip/         # Add trip form
        ├── edit-trip/        # Edit trip form
        ├── login/            # Admin login
        ├── guards/           # Route authentication guard
        ├── services/         # AuthenticationService, TripDataService
        └── models/           # Trip TypeScript interface
```

---

## Journal Reflection

### Architecture

**Compare and contrast the types of frontend development used in this project, including Express HTML, JavaScript, and the single-page application (SPA).**

This project used three distinct frontend approaches, each suited to a different purpose. The initial customer-facing site consisted of static HTML files served directly from the `public/` directory. These pages load fully from the server on every request, which is straightforward and requires no client-side framework, but it means every navigation causes a full page reload.

The second approach used Express combined with the Handlebars (HBS) template engine to render views on the server. This allowed dynamic data—such as trip listings pulled from MongoDB—to be injected into HTML before it was sent to the browser. Server-side rendering is beneficial for SEO and initial load performance because the browser receives complete markup, but the server must regenerate the page for every request, which introduces latency.

The Angular SPA, used for the admin portal, is the most modern approach. Angular loads once in the browser and then handles all navigation and data fetching internally via HTTP calls to the REST API. The result is a fast, app-like experience with no full-page reloads. The trade-off is a more complex build pipeline and a larger initial JavaScript bundle. The SPA is ideal for the admin use case, where interactions like adding, editing, and deleting trips need to feel immediate and responsive.

**Why did the backend use a NoSQL MongoDB database?**

MongoDB was chosen because its document-based, schema-flexible nature is an excellent fit for travel data. Trip records naturally map to JSON-style documents that can embed arrays (such as images or itinerary days) without requiring complex relational joins. As the data model evolves—for example, adding new fields to a trip—MongoDB does not require migration scripts or alterations to a rigid schema. Mongoose layers a validation schema on top of MongoDB at the application level, giving the developer control over data integrity while retaining MongoDB's flexibility. Additionally, MongoDB integrates seamlessly with Node.js because both operate natively with JavaScript objects, reducing the impedance mismatch between the application layer and the data store.

---

### Functionality

**How is JSON different from JavaScript, and how does JSON tie together the frontend and backend development pieces?**

JavaScript is a full programming language with functions, classes, control flow, and closures. JSON (JavaScript Object Notation) is a strict, language-agnostic text format for representing structured data—it supports only strings, numbers, booleans, arrays, objects, and null, and it has no functions or comments. While JSON syntax was inspired by JavaScript object literals, the two are not the same thing.

JSON served as the universal data contract across every layer of this application. The MongoDB documents were stored as BSON (Binary JSON). Mongoose serialized those documents to JSON when they were retrieved. The Express REST API transmitted that JSON to any client via HTTP responses. The Angular SPA consumed the JSON, deserialized it into typed TypeScript objects using the `Trip` interface, and rendered everything in the browser. Without JSON as the shared data format, each layer would need its own serialization and deserialization logic, dramatically increasing complexity.

**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable UI components.**

One significant refactoring was extracting the `TripCard` Angular component. Early in development, all trip-rendering markup was embedded directly in the trip listing template. The card was extracted into its own standalone component (`app-trip-card`) that accepts a `Trip` input and an `isLoggedIn` flag, and emits a `tripDelete` event. This means the edit and delete button logic is defined once and reused on every card in the list, giving consistent behavior, easier maintenance, and a single place to update the UI when requirements change.

On the backend, authentication logic was consolidated into a dedicated `authjwt.js` middleware function. Rather than duplicating JWT verification inside every protected route controller, a single middleware function is applied to any route that requires a logged-in user (POST, PUT, and DELETE on `/api/trips`). Adding or removing protection from a route becomes a one-line change.

---

### Testing

**Explain your understanding of methods, endpoints, and security in a full-stack application.**

HTTP methods define the intent of a request. In this API, `GET` requests are read-only and publicly accessible—no token is required to browse trips. `POST`, `PUT`, and `DELETE` requests modify data and are therefore protected, meaning the server refuses them unless the request carries a valid JWT in the `Authorization: Bearer <token>` header.

An endpoint is the combination of an HTTP method and a URL path that the server maps to a specific controller action. For example, `PUT /api/trips/:tripCode` maps to the `tripsUpdateTrip` controller. Testing all endpoints means verifying expected responses for both valid inputs and invalid inputs (wrong data types, missing fields), as well as both authenticated and unauthenticated calls.

Security adds a testing dimension that goes beyond correctness. Every protected endpoint must be tested with: (1) no token—expecting a `401 Unauthorized` response; (2) a malformed or expired token—again expecting `401`; and (3) a valid token—expecting the operation to succeed. Tools like Postman make this straightforward by allowing custom `Authorization` headers to be included or omitted per request. The Angular `AuthGuard` was also tested by navigating directly to protected routes (`/add-trip`, `/edit-trip`) while logged out to confirm the guard redirected to the login page instead of rendering the form.

---

### Reflection

**How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?**

This course produced concrete, demonstrable evidence of full-stack engineering capability. Before this course, my experience was limited to isolated frontend or backend exercises. Building Travlr Getaways from a static HTML page all the way to a secured REST API with an Angular admin portal gave me end-to-end ownership of a real application: provisioning a database, designing a schema, building a RESTful API, implementing JWT authentication, and consuming that API from a TypeScript SPA.

The skills I developed that have the greatest market value are: understanding the full request/response lifecycle across the stack; implementing stateless authentication with JWTs and hashed passwords using PBKDF2; building reusable Angular components and injectable services that follow the single-responsibility principle; and writing CRUD operations against a MongoDB database using Mongoose. Being able to walk a future employer through this application—explaining why each architectural decision was made—demonstrates not just the ability to write code, but the ability to reason about software design. That combination of practical skill and architectural understanding is what I believe will be most valuable as I continue to grow in my career.



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

