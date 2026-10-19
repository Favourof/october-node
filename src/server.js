import express, { json } from "express";
import { connectDB } from "./config/db.js";

const server = express();
server.use(json());
const port = process.env.PORT;

const product = [
  {
    title: "Laptop  Dell",
    id: 1,
    description: "Good and perfect",
  },
  {
    title: "Phone",
    id: 2,
    description: "Good and perfect",
  },
  {
    title: "Battery",
    id: 3,
    description: "Good and perfect",
  },
];

server.get("/", (req, res) => {
  res.send("welcome to october server");
});

server.delete("/product", (req, res) => {
  const productId = req.body.id;
  // console.log(productId);
  const productIndex = product.findIndex((pro) => pro.id === productId);
  if (productIndex === -1) {
    return res.send({
      message: "Product not found ",
      product,
    });
  }
  product.splice(productIndex, 1);

  // console.log(productIndex);
  return res.send({
    message: " PRoduct delete Successfully",
    product: product,
  });
});

server.get("/products", (req, res) => {
  res.send(product);
});

server.post("/product", (req, res) => {
  console.log(req.body);
  product.push({ ...req.body, id: product.length + 1 });
  res.send({
    message: "Product Added successfully",
    product,
    length: product.length,
  });
});

connectDB();
server.listen(port, () => {
  console.log(`october server is running on port:${port}`);
});
