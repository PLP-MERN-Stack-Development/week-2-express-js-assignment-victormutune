const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
const logger = require('./src/middleware/logger');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');

// Parse JSON bodies
app.use(bodyParser.json());

// Custom logger
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// API routes
const productsRouter = require('./src/routes/products');
app.use('/api/products', productsRouter);

// 404 for unmatched routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
