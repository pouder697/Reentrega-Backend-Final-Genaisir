import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;
