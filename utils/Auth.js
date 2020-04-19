const User = require('../models/User')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')

const {SECRET} = require('../config')



const userRegister = async(userDetails, role,res) =>{
    //Validating the user
    try {
        let usernameNotTaken = await validateUsername(userDetails.username)
    if(!usernameNotTaken){
        return res.status(400).json({
            message: `The username '${userDetails.username}' is already taken! Please try another user-name`,
            successs: false,
        })
    }

    //Validating the email
    let emailNotRegistered = await validateEmail(userDetails.email)

    if(!emailNotRegistered){
        return res.status(400).json({
            message: `Email is already registered .`,
            successs: false,
        })
    }

    //Hashing the password
    const Password  = CryptoJS.AES.encrypt(userDetails.password, 'secret key 123').toString();
    const newUser = new User({
        ...userDetails,
        password:Password,
        role
    });
    await newUser.save();
    return res.status(201).json({
        message: `You have successfully registered. You can now log in.`,
        successs:true
    })
    } catch (err) {
        //Implementing logger function
        return res.status(500).json({
            message: `Unable to create your account`,
            successs:false
        })
    }
};

const userLogin = async (userCredentials,role,res) =>{
    let {username,password} = userCredentials;
    console.log(`userCredentials are : ${username} and password is ${password}`)
    //Firstly checking wether the user name is in the database
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({
            message: "Username is not found. Invalid login credentials.",
            successs:false
        });
    }

    //if the user is find, we'll check the role
    if(user.role !== role){
        return res.status(403).json({
            message: "Please make sure that you are loging in from the right portal.",
            successs:false
        });
    }

    //if there's no invalidation, it means that user exist and trying to sign in from the right portal
    //Now let us check for the password
    const decrypted_pass  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
    const decrypted_password = decrypted_pass.toString(CryptoJS.enc.Utf8);
    console.log(`Decrypted password is : ${decrypted_pass}`)
    //if the password matches, sign in the token and issue it to the user
    if(decrypted_password === password){
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        }, SECRET,
        {expiresIn:"7 days"});

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 48
        };

        return res.status(200).json({
            ...result,
            message: "You have successfully logged in.",
            successs:true
        })

    }else{
        return res.status(403).json({
            message: "Incorrect password.",
            successs:false
        });
    }

}


const validateUsername = async (username) => {
    let user = await User.findOne({username});
    return user ? false : true;
};

const validateEmail = async email => {
    let user = await User.findOne({email});
    return user ? false : true;
}

module.exports = {
    userLogin,
    userRegister
};