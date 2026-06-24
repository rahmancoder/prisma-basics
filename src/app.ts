import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.route";



const app : Application = express();

// CORS
app.use(cors({
    origin : config.app_url,
    credentials : true,
}))

// Express MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


app.get("/",(req : Request, res : Response) => {
    res.send("Hello, World!");
});

// app.post()

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

export default app;