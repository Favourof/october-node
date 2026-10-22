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
    return res.status(200).json({
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

export const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Fount" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Found Successfully", product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Fount" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Deleted Successfully", product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Fount" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Update Successfully", product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};
