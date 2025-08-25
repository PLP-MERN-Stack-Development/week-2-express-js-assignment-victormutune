# Express Products API

A RESTful API built with Express.js that demonstrates CRUD operations, routing, middleware, validation, and error handling.

## ✅ Features
- CRUD for a `products` resource with fields: `id`, `name`, `description`, `price`, `category`, `inStock`
- Middleware:
  - Custom logger (method, URL, timestamp)
  - JSON body parsing (`body-parser`)
  - API key auth via `x-api-key` header (bypassed if no `API_KEY` set)
  - Request validation for create/update
- Error handling:
  - Custom error classes and global handler
  - 404 for unknown routes and missing products
- Advanced:
  - Filter by `category`
  - Pagination with `page` and `limit`
  - Search by name `/api/products/search?q=`
  - Stats endpoint with counts by category

## 🛠 Setup
- Requires **Node.js v18+**
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file (or copy `.env.example`) and set an API key if you want auth enforced:
  ```env
  API_KEY=your_api_key
  PORT=3000
  ```

## 🚀 Run
```bash
npm start
# or
npm run dev
```

Server listens on `http://localhost:3000`.
Root route returns **Hello World**.

## 📚 API Endpoints

### Health
- `GET /` – Hello World

### Products
- `GET /api/products` – List products (supports `?category=electronics&page=1&limit=10`)
  - **Response**
    ```json
    {
      "items": [ /* products */ ],
      "total": 3,
      "page": 1,
      "totalPages": 1,
      "limit": 10
    }
    ```
- `GET /api/products/:id` – Get by ID
- `POST /api/products` – Create product *(Requires `x-api-key` when `API_KEY` is set)*
- `PUT /api/products/:id` – Update product *(Requires `x-api-key` when `API_KEY` is set)*
- `DELETE /api/products/:id` – Delete product *(Requires `x-api-key` when `API_KEY` is set)*

### Search
- `GET /api/products/search?q=phone` – Search by name (also supports `category`, `page`, `limit`)

### Stats
- `GET /api/products/stats` – Returns product counts:
  ```json
  {
    "total": 3,
    "byCategory": {
      "electronics": 1,
      "sports": 1,
      "furniture": 1
    }
  }
  ```

## 🔐 Authentication
If `API_KEY` is set in the environment, write operations require the header:
```
x-api-key: your_api_key
```

If `API_KEY` is **not** set, the auth middleware is bypassed—useful for local dev and autograding.

## 🧪 Sample Requests (curl)

```bash
# List products (first page, 2 per page)
curl "http://localhost:3000/api/products?page=1&limit=2"

# Filter by category
curl "http://localhost:3000/api/products?category=electronics"

# Search
curl "http://localhost:3000/api/products/search?q=phone"

# Create (requires x-api-key if API_KEY configured)
curl -X POST http://localhost:3000/api/products   -H "Content-Type: application/json"   -H "x-api-key: your_api_key"   -d '{"name":"Laptop","description":"15-inch","price":999.99,"category":"electronics","inStock":true}'
```

## 🧩 Project Structure
```
express-products-api/
├─ server.js
├─ package.json
├─ .env.example
├─ README.md
└─ src/
   ├─ routes/
   │  └─ products.js
   ├─ controllers/
   │  └─ productsController.js
   ├─ middleware/
   │  ├─ logger.js
   │  ├─ auth.js
   │  ├─ validators.js
   │  ├─ asyncHandler.js
   │  └─ errorHandler.js
   ├─ data/
   │  └─ store.js
   └─ utils/
      └─ errors.js
```
