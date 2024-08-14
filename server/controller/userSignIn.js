const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res){
    try {
        const { email, password } = req.body;

        console.log("req.body", req.body)

        if (!email) {
            throw new Error("Please Provide Email");
          }
      
          if (!password) {
            throw new Error("Please Provide Password");
          }

          const existingUser = await userModel.findOne({ email });

          if (!existingUser) {
            throw new Error("User not Found");
          }


          const checkPassword = await bcrypt.compare(password, existingUser.password)

          console.log("check password", checkPassword)

          if(checkPassword){

            const tokenData = {
                _id: existingUser._id,
                email: existingUser.email, 
            };
            


            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60  * 8 });

            const tokenOption = {
                httpOnly : true,
                secure : true
            }

            res.cookie("token", token, tokenOption).json({
                message : "Login Successfully",
                data : token,
                success : true,
                error : false
            })

          }else{
            throw new Error("Please Check Password")
          }





    } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
    }

}

module.exports = userSignInController