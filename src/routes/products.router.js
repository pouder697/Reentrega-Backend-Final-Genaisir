import express from 'express';
import ProductManager from '../managers/product-manager.js';

const router = express.Router();
const productManager = new ProductManager();

// Obtener productos con paginación, filtros y ordenamiento
router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query; // Parámetros de consulta
    const products = await productManager.getProducts({ limit, page, sort, query });
    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Obtener un producto por su ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const product = await productManager.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Actualizar un producto
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.id, req.body);
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

// Eliminar un producto
router.delete('/:pid', async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.id);
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

export default router;
