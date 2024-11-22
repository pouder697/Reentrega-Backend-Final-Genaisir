const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.ultId = 0;

        //Cargar los carritos almacenados en el archivo: 
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                //Verifico si hay por lo menos algun elemento y voy a calcular el ultimo id: 
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
                //Utilizo el método map para crear un nuevo array que solo tenga los ids y con Math.Max obtengo el mayor, guardandolo en la propiedad ultId. 
            }
        } catch (error) {
            console.log("Failed to load cart");
            //Si no existe el archivo, lo voy a crear: 
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    //Metodo para crear un carrito: 

    async createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        };

        //Este objeto "carrito" lo pusheamos al array: 
        this.carts.push(newCart);

        //Guardamos el array en el archivo: 
        await this.saveCarts();
        return newCart;
    }

    async getCartById(cartId) {
        try {
            const cartWanted = this.carts.find(cart => cart.id === cartId);

            if(!cartWanted) {
                throw new Error("no cart with selected id"); 
            }

            return cartWanted; 
        } catch (error) {
            throw new Error("failed to get carts"); 
        }
        
    }

    async addProductToCart(cartId, productId, quantity = 1) {
      const cart = await this.getCartById(cartId); 
      const productExists = cart.products.find(product => product.product === productId );
        //De esta forma chequeo si el producto que estoy recibiendo para agregar al carrito ya esta presente en el. Si existe, modifico la cantidad, si no existe lo agrego. 

        if(productExists) {
            productExists.quantity += quantity; 
        } else {
            cart.products.push({product: productId, quantity}); 
        }

        //Como aca yo modifique el carrito, tengo que actualizar el archivo. 
        await this.saveCarts(); 
        return cart; 
    }

}

module.exports = CartManager;