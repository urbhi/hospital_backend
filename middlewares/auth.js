import {catchAsyncerrors} from "../middlewares/catchAsyncerror.js";
import {User} from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorsMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated =catchAsyncerrors(async(req,res,next)=>{
    const token =req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated",400));
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user =await User.findById(decoded.id);
    if(req.user.role !== "Admin")
    {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources`,
                403
            )
        );
    }
    next();
});

export const isPatientAuthenticated =catchAsyncerrors(async(req,res,next)=>{
    const token =req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("patient Not Authenticated",400));
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user =await User.findById(decoded.id);
    if(req.user.role !== "patient")
    {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources`,
                403
            )
        );
    }
    next();
});