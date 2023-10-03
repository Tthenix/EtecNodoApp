import express from "express";
import cors from "cors";
import { courseRouter } from "./routes/course.router.js";
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from "passport";
import MongoStore from "connect-mongo"
import config from "./config/dotenv.config.js";
import initializatePassport from "./config/passport.config.js";
import { connectMongo } from "./utils/mongoose.js";
import { loginRouter } from "./routes/login.router.js";

const app = express()

// * Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = config.port;
export const mongourl = config.mongourl;

connectMongo();

// * Passport 
app.use(session({
    store: MongoStore.create({ mongoUrl: "mongodb+srv://TtheNix:svkDzJPi7tjGcmyx@cluster0.yeuy3ea.mongodb.net/", ttl: 30 * 60}),
    secret: 'secretNODO',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        maxAge: 3600000
    }
}));
initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

// ? ruta para nuestra api de usuarios

app.use("/api/cursos", courseRouter);
app.use("/api/users", loginRouter);
app.use("/login", (req, res) => {
    return res.render("login-form")
})

app.listen(port || 3001, () => {
    console.log("Server escuchando en el puerto ", port)
})