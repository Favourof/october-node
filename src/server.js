import express, { json } from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./Routes/product.js";
import userRoute from "./Routes/user.js";
import { envConfig } from "./config/envConfig.js";
import cors from 'cors'



const server = express();
server.use(json());
server.use(cors())
const port = envConfig.port;

server.use("/product", productRoute);
server.use("/auth", userRoute);

connectDB();
server.listen(port, () => {
  console.log(`october server is running on port:${port}`);
});
