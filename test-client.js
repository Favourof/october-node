import {io} from 'socket.io-client'

const socket = io("ws://localhost:4000")


socket.on("connect", ()=>{
    console.log("A user conneted");
})

socket.on("welcome", (arg)=>{
    console.log(arg);
})

 socket.emit("sender", "Thanks for welcoming me")


socket.on("sender", (msg)=>{
    console.log("Recieved",msg);
})