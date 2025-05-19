import jwt from 'jsonwebtoken';
import userModel from '../Models/User.model';
export const auth = async(req,res,next)=>{
    let token = null;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1];
            let decoded  = jwt.verify(token,process.env.TOKEN_SECRET_KEY)
            console.log(decoded);

            if(decoded){
                const user = await userModel.findOne({_id:decoded._id}).select('-password');
                console.log('middleware',user)
                req.user = user;
                next();
            }else{
                return res.status(401).json({
                    message:"Invalid token"
                })
            }
            
        }else{
            return res.status(401).json({
                message:"Invalid token"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const admin =(req,res,next) =>{
    if(req.user.isAdmin){
        next();
    }else{
        res.status(403).json({
            message:"You don't have an access."
        })
    }
}