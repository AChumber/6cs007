const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//@POST auth
//@DESC Validate user login with credentials passed
//@ACCESS Public
router.post('/', async (req,res) => {
    const {email, password} = req.body;
    if(!email && !password){ 
        return(res.status(400).json({ msg: "Enter login details" }));
    } 

    //Find account from DB
    await User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: "User does not exist" });
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    //Give JWT to client
                    const userEmail = email;
                    const userPayload = { name: userEmail };
                    const jwtToken = jwt.sign(userPayload, process.env.JWT_SECRET);
                
                    return res.status(200).json({
                        msg: "Correct details",
                        accessToken: jwtToken
                    });
                } 
                return res.status(400).json({ msg: "Invalid email or password" });
            })
            .catch(err => {
                if(err) throw err;
            });
        })
        .catch(err => err && res.status(400).json({ msg: "Invalid email or password" }));
});

//Validate if the token recieved is valid. Middle that Will run on protected routes
function verifyToken(req, res, next){
    //Get token from header of req
    const token = req.headers['authorisation'];
    if(token == null) return res.sendStatus(401); //Invalid JWT - Unauthorised

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);  //Invalid JWT - Forbidden
        req.email = user;  //Send payload to the route under req.user
        next();           //Continue with route
    })
}

module.exports = {
    router,
    verifyToken
};