const { v4: uuidv4 } = require('uuid');

// In-memory store (replace with DB in real apps)
const products = [
  {
    id: uuidv4(),
    name: 'Sample Phone',
    description: 'A demo smartphone',
    price: 299.99,
    category: 'electronics',
    inStock: true,
  },
  {
    id: uuidv4(),
    name: 'Running Shoes',
    description: 'Lightweight running shoes',
    price: 89.5,
    category: 'sports',
    inStock: true,
  },
  {
    id: uuidv4(),
    name: 'Office Chair',
    description: 'Ergonomic chair',
    price: 149.0,
    category: 'furniture',
    inStock: false,
  },
];

function list({ category, page = 1, limit = 10, search }) {
  let data = products.slice();

  if (category) {
    data = data.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(q));
  }

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  return { items: paginated, total, page, totalPages, limit };
}

function getById(id) {
  return products.find(p => p.id === id) || null;
}

function create(product) {
  const newProduct = { id: uuidv4(), ...product };
  products.push(newProduct);
  return newProduct;
}

function update(id, updates) {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...updates };
  return products[idx];
}

function remove(id) {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

function stats() {
  const byCategory = {};
  for (const p of products) {
    const c = p.category;
    byCategory[c] = (byCategory[c] || 0) + 1;
  }
  return { total: products.length, byCategory };
}

module.exports = { list, getById, create, update, remove, stats };
