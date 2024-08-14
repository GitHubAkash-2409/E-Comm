const jwt = require('jsonwebtoken')

async function authToken(req, res, next){
    try {
        const token = req.cookies?.token
        if(!token){
            return res.status(200).json({
                message : "user not logedin",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            // console.log("err", err)
            // console.log("decoded", decoded)

            if(err){
                console.log("error auth", err)
            }

            req.CurrentUserDetailsId = decoded?._id

            next()

          });

        


    } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: error.message,
      data : [],
      error: true,
      success: false,
    });
    }
}

module.exports =authToken