import Product from '../models/Product.js';

class ProductManager {
  async createProduct(data) {
    try {
      const product = await Product.create(data);
      return product;
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }

  async getProducts({ limit = 10, page = 1, sort, query }) {
    try {
      const filter = query ? { category: query } : {};
      const options = {
        limit,
        page,
        sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : undefined,
      };

      const products = await Product.paginate(filter, options);
      return products;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  async updateProduct(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) throw new Error('Producto no encontrado');
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}

export default ProductManager;
