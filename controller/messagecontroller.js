
import{catchAsyncerrors} from '../middlewares/catchAsyncerror.js'
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorsMiddleware.js"; 

export const sendMessage =catchAsyncerrors(async(req,res,next)=>{
    const {firstName , lastName , email , phone , message} =req.body;
    if(!firstName || !lastName||!email||!phone||!message){
        return next(new ErrorHandler("Please Fill Full Form",400)); 
    }
        await Message.create({firstName , lastName , email , phone , message});
        res.status (200).json({
            success:true,
            message:"Message send Successfully!",
        });
    
});

export const getAllMessages = catchAsyncerrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  });