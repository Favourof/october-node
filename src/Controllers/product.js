import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, image, stock } = req.body;
    if (!title || !description || !price || !image || !stock) {
      return res
        .status(400)
        .json({ status: false, message: "All field are Required" });
    }
    const product = await Product.create({
      title,
      description,
      price,
      image,
      stock,
    });

    return res
      .status(201)
      .json({ status: true, message: "Product Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }
    return res
      .status(200)
      .json({
        status: true,
        message: "Fetch Products SuccessFully",
        product,
        length: product.length,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
