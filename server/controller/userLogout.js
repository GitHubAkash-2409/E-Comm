async function userLogoutController(req, res){
    try {

        res.clearCookie("token");

        res.json({
            message : "Logged Out Successfully",
            error : false,
            success : true,
            data : []
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

module.exports = userLogoutController