const router = require('express').Router();

//User Registration
router.post('/register-user', async(req,res,next) => {})
//Admin Registration
router.post('/register-admin', async(req,res,next) => {})
//Super AdminRegistration
router.post('/register-super-admin', async(req,res,next) => {})
//User Login
router.post('/login-user', async(req,res,next) => {})
//Admin Login
router.post('/login-super-admin', async(req,res,next) => {})

//SuperAdmin Login
router.post('/login-super-admin', async(req,res,next) => {})

//Profile Route
router.get("profile", async(req,res) => {})

//Users Protector Route
router.post('/user-profile', async(req,res,next) => {})

//Admin Protected
router.post('/admin-profile', async(req,res,next) => {})

//SuperAdmin Protected
router.post('/super-admin-profile', async(req,res,next) => {})

module.exports = router;