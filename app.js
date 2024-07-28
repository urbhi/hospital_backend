import express from "express";
import { config } from "dotenv";
import  cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbconnection.js";
import fileUpload from "express-fileupload";
import MessageRouter from "./Router/MessageRouter.js";
import {errorsMiddleware}from './middlewares/errorsMiddleware.js'
import userRouter from "./Router/userRouter.js"
import appointmentRouter from "./Router/appointmentRouter.js";
const app =  express();
config({path: "./config/config.env"});
    app.use(cors(
        {origin: [process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
            methods:["GET","POST","PUT","DELETE"],
            credentials:true,
        }
    )
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
    useTempFiles:true,
    tempFilesDir:"/tmp/",
})
);

app.use( "/api/v1/message", MessageRouter);
app.use( "/api/v1/user", userRouter);
app.use( "/api/v1/appointment", appointmentRouter);

dbConnection();
app.use(errorsMiddleware);
export default app;