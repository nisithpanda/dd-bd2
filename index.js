const express = require('express');
const cors = require('cors');

const products = require('./product');

const app = express();
const port = 3000;

app.use(cors());
/**
 * /products/sort/popularity
 */

function sortByPopularity() {
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
  return sortedProducts;
}
app.get('/products/sort/popularity', (req, res) => {
  const sortedProducts = sortByPopularity();
  res.json({
    products: sortedProducts,
  });
});

/**
 * /products/sort/price-high-to-low
 */
app.get('/products/sort/price-high-to-low', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => b.price - a.price);
  res.json({
    products: sortedProducts,
  });
});

/**
 * /products/sort/price-low-to-high
 */
app.get('/products/sort/price-low-to-high', (req, res) => {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  res.json({
    products: sortedProducts,
  });
});

/**
 * /products/filter/ram
 */
function filterByRam(ramSize) {
  const filterProducts = products.filter((product) => product.ram === ramSize);
  return filterProducts;
}

app.get('/products/filter/ram', (req, res) => {
  const ramSize = parseInt(req.query.ram);
  const filterProducts = filterByRam(ramSize);
  res.json({
    products: filterProducts,
  });
});

/**
 * /products/filter/rom
 */
function filterByRom(romSize) {
  const filterProducts = products.filter((product) => product.rom === romSize);
  return filterProducts;
}

app.get('/products/filter/rom', (req, res) => {
  const romSize = parseInt(req.query.rom);
  const filterProducts = filterByRom(romSize);
  res.json({
    products: filterProducts,
  });
});

/**
 * /products/filter/brand
 */
function filterByBrand(brand) {
  const filterProducts = products.filter(
    (product) => product.brand.toLowerCase() === brand
  );
  return filterProducts;
}

app.get('/products/filter/brand', (req, res) => {
  const brand = req.query.brand.toLowerCase();
  const filterProducts = filterByBrand(brand);
  res.json({
    products: filterProducts,
  });
});

/**
 * /products/filter/os
 */
function filterByOs(os) {
  const filterProducts = products.filter(
    (product) => product.os.toLowerCase() === os
  );
  return filterProducts;
}

app.get('/products/filter/os', (req, res) => {
  const os = req.query.os.toLowerCase();
  const filterProducts = filterByOs(os);
  res.json({
    products: filterProducts,
  });
});

/**
 * /products/filter/price
 */
function filterByPrice(price) {
  const filterProducts = products.filter((product) => product.price === price);
  return filterProducts;
}

app.get('/products/filter/price', (req, res) => {
  const price = parseInt(req.query.price);
  const filterProducts = filterByPrice(price);
  res.json({
    products: filterProducts,
  });
});

app.get('/products', (req, res) => {
  //console.log(products);
  res.json({
    products,
  });
});

app.get('/', (req, res) => {
  //console.log(products);
  res.send('Welcome to the Flip Deal Product Listing Page API!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
