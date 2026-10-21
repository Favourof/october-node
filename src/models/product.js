import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
    minLength: [3, "title must not be less than 3 character"],
    maxLength: [120, "Title can not be greater than 120 character"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
    minLength: [10, "Description must not be less than 10 character"],
    maxLength: [300, "Description can not be greater than 300 character"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is Required"],
    min: [100, "Price cannot be less than 100"],
    max: [1000000, "Price cannot be Greater than 1000000"],
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "stock cannot be less than 1"],
    max: [1000, "stock cannot be Greater than 1000"],
  },
});

const product = mongoose.model("product", productSchema);
export default product;
