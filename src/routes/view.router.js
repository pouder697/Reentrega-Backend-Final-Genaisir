import express from 'express';
import ProductManager from '../managers/product-manager.js';
import CartManager from '../managers/cart-manager.js';

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

// Ruta para mostrar la lista de productos con paginación
router.get('/products', async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query; // Parámetros de consulta
    const products = await productManager.getProducts({ limit, page, sort, query });

    // Renderiza la vista de productos con los datos obtenidos
    res.render('products', {
      title: 'Productos',
      products: products.docs, // Lista de productos
      totalPages: products.totalPages,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      limit: limit || 10, // Valor predeterminado para el límite
    });
  } catch (error) {
    res.status(500).render('error', { message: 'Error al cargar los productos' });
  }
});

// Ruta para mostrar los detalles de un producto
router.get('/products/:id', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id);

    // Renderiza la vista de detalle de producto con los datos obtenidos
    res.render('productDetail', {
      title: product.name,
      product,
    });
  } catch (error) {
    res.status(404).render('error', { message: 'Producto no encontrado' });
  }
});

// Ruta para mostrar el carrito de compras
router.get('/carts/:id', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.id);

    // Renderiza la vista de carrito con los productos en el carrito
    res.render('cart', {
      title: 'Mi Carrito',
      products: cart.products,
      cartId: req.params.id,
    });
  } catch (error) {
    res.status(404).render('error', { message: 'Carrito no encontrado' });
  }
});

// Ruta de inicio (opcional)
router.get('/', (req, res) => {
  res.render('home', { title: 'Bienvenido a la Tienda' });
});

export default router;
