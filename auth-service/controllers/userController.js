const bcrypt  = require("bcrypt")
const userModel  = require("../models/usersModel")
const jwt = require( "jsonwebtoken")
 const loginController = async (request, response) => {
    try {
        const {email, password } =   request.body
        if ( !email || !password) {
            return response.status(400).json({ status: 400, message: "All fields are madatory" })
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return response.status(400).json({ status: 400, message: "Invalid email" })
        }
        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return response.status(400).json({ status: 400, message: "Invalid password" })
        }
        //create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        user.password = undefined
        return response.status(200).json({ status:200, message: "Login successfull", user })
    }
    catch (err) {
        return response.status(400).json({ status: 500, message: err.message })
    }

}


 const signUpController = async(request,response)=>{
    try{
     
        const { name, email, password} = request.body
        //validate the email and password
         if(!name || !email || !password){
            return  response.status(400).json({status:400, message:"All fields are mandatory"})
         }
        //check if email already exists or not
        const user = await userModel.findOne({email:email})
        if(user){
            return  response.status(400).json({status:400, message:"User already existed"})
        }
        //create user,if user was not exists
        const hashpassword = bcrypt.hashSync(password, 10)
       const newUser = new userModel({email:email,password:hashpassword})
        await newUser.save()
        return response.json({status:200,message:"user created successfully"})

    }catch(err){
        console.log(err)
        return  response.status(500).json({status:"500", message:err.message})
    }
}

const getAllUsersController = async(req,res)=>{

    try{
        const users = await userModel.find({})
      if(users.length == 0){
        return res.status(200).json({message:"no users available"})
      }
      return res.status(200).json({message:"users fetched successfully", users:users})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: err,
        })
    }
    return res.json({message:"All users are fetched successfully"})
}

module.exports = {loginController, signUpController,getAllUsersController}