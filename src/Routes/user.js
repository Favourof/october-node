import express from "express";
import { isAuth, login, register } from "../Controllers/user.js";
import { checkAuth } from "../Middlewares/checkAuth.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/me", checkAuth, isAuth )

export default route;
