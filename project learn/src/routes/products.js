const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { validateCreate, validateUpdate } = require('../middleware/validators');
const asyncHandler = require('../middleware/asyncHandler');
const controller = require('../controllers/productsController');

// Apply auth only if API_KEY is configured (handled internally in middleware)
router.get('/', asyncHandler(controller.listProducts));
router.get('/search', asyncHandler(controller.searchProducts));
router.get('/stats', asyncHandler(controller.getStats));
router.get('/:id', asyncHandler(controller.getProduct));

router.post('/', auth, validateCreate, asyncHandler(controller.createProduct));
router.put('/:id', auth, validateUpdate, asyncHandler(controller.updateProduct));
router.delete('/:id', auth, asyncHandler(controller.deleteProduct));

module.exports = router;
