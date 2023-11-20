import passport from "passport";
import local from "passport-local";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import moment from "moment-timezone";


const localStrategy = local.Strategy;
const initializatePassport = () => {
  passport.use("register", new localStrategy(
    {passReqToCallback: true, usernameField: "email"}, async (req, username, password, done) => {
      const {email} = req.body;
      try{
        let user = await userModel.findOne({email: username});
        if(user){
          console.log("User already exist");
          return done(null, false)
        }
        const newUser = {
          email,
          password: createHash(password)
        }
        let result = await userModel.create(newUser)
        return done(null, result)
      }catch(error){
        return done("Error al obtener el usuario " + error)
      }

      
    }

  ))
  passport.use("login", new localStrategy({usernameField: "email"}, async(username, password, done) => {
    try{
      const user = await userModel.findOne({email: username})
      if(!user){
        return done(null, false)
      }
      if(!isValidPassword(user, password)) return done(null, false);
      const fechaActualArgentina = moment().tz('America/Argentina/Buenos_Aires');
      const fechaHoraArgentina = "login: " + fechaActualArgentina.format('YYYY-MM-DD HH:mm:ss');
      const res = await userModel.updateOne({email: username}, {last_connection: fechaHoraArgentina})
      return done(null, user)
    } catch(error) {
      return done(error)
    }
  }))
  passport.serializeUser((user, done) => {
    done(null, user._id)
    })

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
  })
}
export default initializatePassport;