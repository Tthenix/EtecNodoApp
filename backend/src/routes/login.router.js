import express from "express";
import passport from 'passport';
import { loginController } from "../controller/login.controller.js"

export const loginRouter = express.Router()

loginRouter.get("/current", loginController.current)

loginRouter.post("/register", passport.authenticate("register", {failureRedirect: "/failRegister"}), loginController.register)

loginRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failLogin"}), loginController.login)
loginRouter.get("/:id", loginController.getLogin);

loginRouter.get("/logout", loginController.logout);