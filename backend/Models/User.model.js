import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
     password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        default:null
    },
    image:{
        type:String,
        default:null
    },
    
    isAdmin:{
        type:Boolean,
        default:false
    },
    hasVoted:
     { type: Boolean, default: false },
    status:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

export default mongoose.model('User',UserSchema)