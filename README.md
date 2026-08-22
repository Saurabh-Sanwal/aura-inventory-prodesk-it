# Aura Inventory Engine

A simple, fast inventory dashboard built with the MERN stack (MongoDB, Express, React, Node).
It handles 50,000 products without freezing the browser, using pagination, debounced search,
and MongoDB aggregation for analytics.

## Project structure

```
aura-inventory-engine/
  backend/     -> Node + Express + MongoDB API
  frontend/    -> React (Vite) dashboard
```

## Backend setup

1. Open a terminal in the `backend` folder:
   ```
   cd backend
   npm install
   ```
2. The `.env` file already has your MongoDB URI and port. No changes needed unless you
   want to use a different database.
3. Seed the database with 50,000 fake products (only run this once):
   ```
   npm run seed
   ```
   This will take a few minutes since it's inserting 50,000 records.
4. Start the server:
   ```
   npm run dev
   ```
   The API will run at `http://localhost:5000`.

## Frontend setup

1. Open a new terminal in the `frontend` folder:
   ```
   cd frontend
   npm install
   ```
2. The `.env` file already points to `http://localhost:5000` (the backend).
3. Start the app:
   ```
   npm run dev
   ```
   The dashboard will open at `http://localhost:5173`.

## What it does

- **Dashboard** — shows total SKUs, total inventory value, out-of-stock count, a
  restock-priority list (lowest stock items), and inventory value by category.
- **Inventory table** — search products (with a 500ms debounce so it doesn't spam the
  server), filter by category, sort by price or stock, and page through results 50 at
  a time instead of loading everything at once.
- **Export CSV** — downloads the currently visible table rows as a CSV file.

## API routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/inventory` | Paginated, searchable, filterable, sortable product list |
| POST | `/api/inventory` | Create a new product (validates price >= cost, stock >= 0) |
| PUT | `/api/inventory/:id` | Update a product |
| GET | `/api/analytics` | Totals, low stock list, category breakdown |

## Notes

- The seed script fills the database with realistic fake data using `@faker-js/faker` —
  this is a training project, so there is no real client data involved.
- No login/signup is included, as it wasn't required for this MVP.
