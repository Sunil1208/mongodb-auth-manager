const router = require('express').Router();

//importing the registration function
const {userRegister,userLogin} = require('../utils/Auth')

//User Registration
router.post('/register-user', async(req,res) => {
    await userRegister(req.body,'user',res);
})
//Admin Registration
router.post('/register-admin', async(req,res) => {
    await userRegister(req.body,'admin',res);

})
//Super AdminRegistration
router.post('/register-super-admin', async(req,res) => {
    await userRegister(req.body,'super-admin',res);

})
//User Login
router.post('/login-user', async(req,res) => {
    await userLogin(req.body,'user',res);
})

//Admin Login
router.post('/login-admin', async(req,res) => {
    await userLogin(req.body,'admin',res);
})

//SuperAdmin Login
router.post('/login-super-admin', async(req,res) => {
    await userLogin(req.body,'super-admin',res);
})

//Profile Route
router.get("profile", async(req,res) => {})

//Users Protector Route
router.post('/user-profile', async(req,res,next) => {})

//Admin Protected
router.post('/admin-profile', async(req,res,next) => {})

//SuperAdmin Protected
router.post('/super-admin-profile', async(req,res,next) => {})

module.exports = router;