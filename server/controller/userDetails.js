const userModel = require("../models/userModel");

async function userDetailsController(req, res){
    try {
        console.log("user-id",req.CurrentUserDetailsId)

        const user = await userModel.findById(req.CurrentUserDetailsId)

        res.status(200).json({
          data : user,
          error : false,
          success : true,
          message : "user details"
        })

    } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
    }
}


module.exports = userDetailsController
