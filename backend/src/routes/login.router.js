import express from "express";
import passport from 'passport';
import { loginController } from "../controller/login.controller.js"

export const loginRouter = express.Router()

loginRouter.get("/current", loginController.current)
loginRouter.post("/register", passport.authenticate("register", {failureRedirect: "/api/users/failRegister"}), loginController.register)
loginRouter.post("/login", passport.authenticate("login", {failureRedirect: "/api/users/failLogin"}), loginController.login)
loginRouter.get("/getUser", loginController.getLogin);
loginRouter.get("/logout", loginController.logout);
loginRouter.get("/failRegister", loginController.failRegister)
loginRouter.get("/failLogin", loginController.failLogin)
