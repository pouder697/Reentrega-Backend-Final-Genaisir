import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.id);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

// Ruta para agregar un producto al carrito seleccionado
router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params; // ID del carrito y del producto
      const { quantity = 1 } = req.body; // Cantidad (por defecto 1)
  
      // Llama al método para agregar el producto al carrito
      const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
  
      res.status(200).json({
        status: 'success',
        message: `Producto ${pid} agregado al carrito ${cid}`,
        payload: updatedCart,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  });

export default router;
