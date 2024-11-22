const express = require("express");
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");

//1) La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior

router.get("/", async (req, res) => {
    let limit = req.query.limit; 
    try {
        const productsArray = await manager.getProducts(); 

        if(limit) {
            res.send(productsArray.slice(0, limit));
        } else {
            res.send(productsArray);
        }
    } catch (error) {
        res.status(500).send("internal server error");
    }
})

//2) La ruta GET /:pid deberá traer sólo el producto con el id proporcionado

router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 

    try {
        const productWanted = await manager.getProductById(parseInt(id)); 

        if (!productWanted) {
            res.send("product not found");
        }else {
            res.send(productWanted);
        }

    } catch (error) {
        res.status(500).send("internal server error");
    }
})

//Agregar un nuevo producto:

router.post("/", async (req, res) => {
    const newProduct = req.body; 

    try {
        await manager.addProduct(newProduct);
        res.status(201).send("product successfully added");
    } catch (error) {
        res.status(500).send("internal server error");
    }
})


//Completar con el método PUT y Delete de productos: 





module.exports = router;