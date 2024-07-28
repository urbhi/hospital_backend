import express from "express";
import{isAdminAuthenticated} from "../middlewares/auth.js"
import { getAllMessages, sendMessage } from "../controller/messagecontroller.js";

const Router =express.Router();
Router.post("/send",sendMessage);
Router.get("/getall",isAdminAuthenticated,getAllMessages);

export default Router;