import express, { json } from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./Routes/product.js";

const server = express();
server.use(json());
const port = process.env.PORT;

server.use("/product", productRoute);

connectDB();
server.listen(port, () => {
  console.log(`october server is running on port:${port}`);
});
