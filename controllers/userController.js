import { User } from "../models/userModel.js"

// user registration
export const userRegisterController=async(req, res)=>{
    try{
        const {name,password,email,address,city, country,phoneNumber}  = req.body
        if(!name || !password || !email || !address || !city || !country || !phoneNumber){
            return res.status(403).send({
                succes:false,
                message:'Please provide all required fields'
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(422).send({
                success:false,
                message:'User already exist'
            })
        }
        const user = await User.create({
            name,password,email,address,city, country,phoneNumber
        })
        res.status(201).send({
            status:true,
            message:"User created successfully",
            user
        })
    }
    catch(err){
        res.status(500).send({
            message:err.message,
            success:false,
        })
    }
}


// user login
export const userLoginController=async(req, res)=>{
    try{const {email, password} = req.body
    console.log(email , password)
    if(!email || !password){
        return res.status(404).send({success:false,message:"Please provide both email and password"})
    }

    const user = await User.findOne({email})
    console.log(user)

    if(!user){
        return res.status(404).send({
            success:false,
            message:'User not found'
        })
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).send({
            success:false,
            message:'Invalid credentials'
        })
    }

    const token = user.generateToken()
    delete {...user.password}

    res.status(200).send({
        success:true,
        token,
        userInfo:user,
        message:'User logged in successfully'
    })

    }catch(err){
        res.status(500).send({
            message:err.message,
            success:false,
        })
    }   
}