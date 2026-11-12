import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";
import user from "../models/user.js";
import User from "../models/user.js";

export const addProduct = async (req, res) => {

  // console.log(req.file);
  // console.log(req.body);
  const image = req.file

  console.log(image);



  try {
    const { title, description, price, stock } = req.body;
    if (!title || !description || !price || !image || !stock) {
      return res
        .status(400)
        .json({ status: false, message: "All field are Required" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "october-cohort" },
      async (error, result) => {
        if (error) {
          console.log("erorrrrrrrr", error);

          return res.status(500).json({ status: false, message: error.message })
        }

        const productData = {
          ...req.body,
          userId: req.id,
          image: result.secure_url,
          imageId: result.public_id
        }

        const product = await Product.create(productData)
        return res
          .status(201)
          .json({ status: true, message: "Product Created Successfully", product });

      }
    )
    stream.end(req.file.buffer)



  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};[]

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
    const product = await Product.findOneAndDelete({ _id: productId, userId: req.id });
    console.log(req.userId);

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
    const product = await Product.findOneAndUpdate({ _id: productId, userId: req.id }, { $set: req.body }, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Fount or not unauthorized" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Update Successfully", product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};
