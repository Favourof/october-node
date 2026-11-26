import express, { json } from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./Routes/product.js";
import userRoute from "./Routes/user.js";
import { envConfig } from "./config/envConfig.js";
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io";


const app = express();
app.use(json());
app.use(cors())
const port = envConfig.port;

const server = http.createServer(app)

const io = new Server(server, {
  cors: {origin: "*"}
})
let userCount = 0
io.on("connection", (Socket)=>{
  userCount++
  const userNumber = userCount
  console.log(`user ${userNumber}`, Socket.id);
  Socket.emit("welcome", `Hello! user ${userNumber} You are welcome to the Group`)

  Socket.on("sender", (msg)=>{
    console.log(msg);
    
    io.emit("sender", msg)
  })

})


app.use("/product", productRoute);
app.use("/auth", userRoute);

app.get("/", (req, res)=>{
  res.status(200).send("welcome to october app")
})

app.use((req, res)=>{
  res.status(400).send("Route not Found")
})


connectDB();
server.listen(port, () => {
  console.log(`october server is running on port:${port}`);
});
