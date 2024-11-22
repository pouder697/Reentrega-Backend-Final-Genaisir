const fs = require("fs").promises;


class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;

        this.loadArray(); 
    }

    async loadArray() {
        try {
            this.products = await this.readFile();
        } catch (error) {
            console.log("failed to initialize ProductManager");
        }
    }

    async addProduct({ title, description, price, img, code, stock }) {

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("all files are required");
            return;
        }

        //2) Validacion: 

        if (this.products.some(item => item.code === code)) {
            console.log("the code cannot be reapeated");
            return;
        }

        const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        const newProduct = {
            id: lastProductId + 1,
            title,
            description,
            price,
            img,
            code,
            stock
        };

        //4) Metemos el producto al array. 
        this.products.push(newProduct);

        //5) Lo guardamos en el archivo: 
        await this.saveFile(this.products);
    }

    async getProducts() {
        try {
            const productsArray = await this.readFile(); 
            return productsArray;
        } catch (error) {
            console.log("failed to read the file", error); 
        }

    }

    async getProductById(id) {
        try {
            const productsArray = await this.readFile();
            const searched  = productsArray.find(item => item.id === id); 

            if (!searched) {
                console.log("product not found"); 
                return null; 
            } else {
                console.log("product found"); 
                return searched; 
            }
        } catch (error) {
            console.log("failed to search by id", error); 
        }
    }

    //Métodos auxiliares: 
    async readFile() {
        const response = await fs.readFile(this.path, "utf-8");
        const productsArray = JSON.parse(response);
        return productsArray;
    }

    async saveFile(productsArray) {
        await fs.writeFile(this.path, JSON.stringify(productsArray, null, 2));
    }

    //Método para actualizar productos: 

    async updateProduct(id, updatedProduct) {
        try {
            const productsArray = await this.readFile(); 

            const index = productsArray.findIndex( item => item.id === id); 

            if(index !== -1) {
                productsArray[index] = {...productsArray[index], ...updatedProduct} ; 
                await this.saveFile(productsArray); 
                console.log("updated product"); 
            } else {
                console.log("product not finded"); 
            }
        } catch (error) {
            console.log("error while updating products"); 
        }
    }

    async deleteProduct(id) {
        try {
            const productsArray = await this.readFile(); 

            const index = productsArray.findIndex( item => item.id === id); 

            if(index !== -1) {
                productsArray.splice(index, 1); 
                await this.saveFile(productsArray); 
                console.log("product removed"); 
            } else {
                console.log("product not found"); 
            }
        } catch (error) {
            console.log("error while deleting products"); 
        }
    }

}

module.exports = ProductManager; 