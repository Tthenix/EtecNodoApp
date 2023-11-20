import { userModel } from "../models/user.model.js";

class LoginController{
  register(req, res){
    return res.status(200).json({
      status: "success",
      message: "Register realizado con exito",
      valid: true
    })
  }

  async getLogin(req, res){
    if(!req.session.user)
    {
      // hacer logger
      return res.json({
        status: "error",
        message: "not logged in",
        valid: false
      })
    }
    // hacer logger
    return res.status(200).json({
      status: "success",
      message: "already logged in",
      payload: req.session.user,
      valid: true
    })
  }

  login(req, res) {
    req.session.user = req.user
    return res.status(200).send({
      valid: true,
      user: req.session.user
    });
  }

  logout(req, res){
    req.session.destroy( err => {
      if(!err) res.status(200).json({
        status: "success",
        message: "Deslogueado con exito",
        redirect: "/login"
      })
      else res.send({status: "ERROR", body: err})
    })
  }

  current(req, res){
    return res.send(req.session.user)
  }

  failRegister(req, res){
    return res.json({
      status: "error",
      message: "hubo un error a la hora de registrarte",
      valid: false
    })
  }

  failLogin(req, res){
    return res.json({
      status: "error",
      message: "hubo un error a la hora de loguearte",
      valid: false
    })
  }
}

export const loginController = new LoginController()