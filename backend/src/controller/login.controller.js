import { userModel } from "../models/user.model.js";

class LoginController{
  register(req, res){
    return res.status(200).json({
      status: "success",
      message: "Register realizado con exito",
      payload: "/"
    })
  }

  async getLogin(req, res){
    const {id } = req.params
    console.log(id);
    const foundUser = await userModel.findById(id);
    console.log(foundUser);
    req.session.user = foundUser
    if(req.session.user){
      
      return res.send({
        loggedIn: true,
        user: req.session.user
      });
    }else {
      return res.send({
        loggedIn: false
      });
    }
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

}

export const loginController = new LoginController()