import express from "express";
import { isAuth, login, register } from "../Controllers/user.js";
import { checkAuth } from "../Middlewares/checkAuth.js";
import { loginSchema, registerSchema } from "../validators/user.js";

const route = express.Router();

route.post("/register", registerSchema, register);
route.post("/login", loginSchema, login);
route.get("/me", checkAuth, isAuth )

export default route;
