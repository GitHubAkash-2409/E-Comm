const userModel = require("../models/userModel");

async function allUsersController(req, res) {
    try {
        // console.log("userid-allUsers", req.userId)

        const allUsers = await userModel.find()

        res.json({
            message : "All User",
            data : allUsers,
            success : true,
            error : false
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

module.exports = allUsersController