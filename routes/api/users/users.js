const router = require('express').Router();
const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@POST users
//@DESC Create a new user account with data passed.
//@ACCESS Public
router.post('/', async (req, res) => {
    const {email, password, firstName, surname, dateOfBirth} = req.body;
    
    //Recieve req.body with details for document
    if(!email || !password || !firstName || !surname){
        return res.status(400).json({ msg: "Enter all fields to create account" });
    }
    
    await User.findOne({ email: email })
        .then(user => {
            //User already exists in DB
            if(user) return(res.status(400).json({ msg: "Account already exists" }));
            
            //No user add to DB
            bcrypt.genSalt(10, (err, salt)=>{
                if(err) throw err;
                
                bcrypt.hash(password, salt, async (err, hash)=>{
                    if(err) throw err;
                    if(!err){
                        //Add hashed password to db
                        const newUser = new User({ email, 
                            password: hash,
                            firstName,
                            surname,
                            DOB: dateOfBirth
                            });
                        
                        await newUser.save()
                            .then(user => {
                                //Give JWT to client
                                const userEmail = user.email;
                                const userPayload = { name: userEmail };
                                const jwtToken = jwt.sign(userPayload, process.env.JWT_SECRET);
                                
                                return res.status(200).json({ 
                                    msg: "Account Created",
                                    accessToken: jwtToken,
                                    user: user
                                });
                            })
                            .catch(err => {
                                return res.status(400).json({ msg: "Account already exists" });
                            });
                    }
                })
            })
            
        })
        .catch((err) => {
            if(err) return(res.status(400).json({ msg: "Could not create account" }));
        });
})

module.exports = router;