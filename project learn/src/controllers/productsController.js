const store = require('../data/store');
const { NotFoundError } = require('../utils/errors');

// GET /api/products
async function listProducts(req, res) {
  const { category, page = 1, limit = 10 } = req.query;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
  const result = store.list({ category, page: pageNum, limit: limitNum });
  res.json(result);
}

// GET /api/products/:id
async function getProduct(req, res, next) {
  const product = store.getById(req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
}

// POST /api/products
async function createProduct(req, res) {
  const product = store.create(req.body);
  res.status(201).json(product);
}

// PUT /api/products/:id
async function updateProduct(req, res, next) {
  const updated = store.update(req.params.id, req.body);
  if (!updated) return next(new NotFoundError('Product not found'));
  res.json(updated);
}

// DELETE /api/products/:id
async function deleteProduct(req, res, next) {
  const ok = store.remove(req.params.id);
  if (!ok) return next(new NotFoundError('Product not found'));
  res.status(204).send();
}

// GET /api/products/search?q=
async function searchProducts(req, res) {
  const { q = '', category, page = 1, limit = 10 } = req.query;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
  const result = store.list({ category, page: pageNum, limit: limitNum, search: q });
  res.json(result);
}

// GET /api/products/stats
async function getStats(req, res) {
  const result = store.stats();
  res.json(result);
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats,
};
