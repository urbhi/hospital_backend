class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
    }
}

export const errorsMiddleware =(err,req,res,next)=>{
    err.message=err.message||"internal server error";
    err.statuscode=err.statuscode||500;

    if(err.code===11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} Enterd`;
        err=new ErrorHandler(message,400);
    }
    if(err.name ==="jsonWebTokenError "){
        const message ="json Web Token is invalid,Try Again!";
        err=new ErrorHandler(message,400);
    }
    if(err.name ==="TokenExpiredError "){
        const message ="json Web Token is Expired,Try Again!";
        err=new ErrorHandler(message,400);
    }
    if(err.name ==="CastError "){
        const message =`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    const errorMessage =err.errors? Object.values(err.errors)
    .map((error)=>error.message)
    .join(" ")
    :err.message;

    return res.status(err.statuscode).json({
        success:false,
        message: errorMessage , 
    })
};
export default ErrorHandler;