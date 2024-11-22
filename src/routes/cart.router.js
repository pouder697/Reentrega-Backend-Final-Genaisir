const express = require("express");
const CartManager = require("../managers/cart-manager.js");
const cartManager = new CartManager("./src/data/carts.json"); 
const router = express.Router(); 

//1) La ruta raíz POST / deberá crear un nuevo carrito

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.send(newCart);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

//2) La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

router.get("/:cid", async (req, res) => {
    let cartId = parseInt(req.params.cid); 

    try {
        const cartWanted = await cartManager.getCartById(cartId); 

        res.json(cartWanted.products); 
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})


//3) La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado

router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = parseInt(req.params.cid); 
    const productId = parseInt(req.params.pid); 
    const quantity = req.body.quantity || 1; 

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productId, quantity);
        res.json(carritoActualizado.products); 
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})


module.exports = router; 