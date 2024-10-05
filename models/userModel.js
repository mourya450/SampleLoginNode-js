import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
const userSchema= new Schema({
    name:{
        type:String,
        require:[true , 'name is required']
    },
    email:{
        type:String,
        required:[true , 'email is required'],
        unique:[true , 'email should be unique']
    },
    password:{
        type:String,
        required:[true , "password is required"],
        minLength:[6 , 'password should contain minimum 6 chearcter']
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    city:{
        type:String,
        required:[true , 'country name is required']
    },
    country:{
        type:String,
        required:[true , 'country is reqired']
    },
    phoneNumber:{
        type:String,
        required:[true , 'phone number is required']
    },
    profilePic:{
        type:String
    },

},{timestamps:true})

// function for hashing password
userSchema.pre('save' , async function(){
    this.password = await bcrypt.hash(this.password , 10)
})

// compare password
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword , this.password)
}

// jwt token
userSchema.methods.generateToken = function(){
    return JWT.sign({_id:this._id}, process.env.JWT_SECRET ,{
        expiresIn:'7d'
    })
}

export const User = model("Users" , userSchema) 