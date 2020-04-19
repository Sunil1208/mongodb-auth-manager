const router = require('express').Router();

//importing the registration function
const {
    userRegister,
    userLogin,
    userAuth,
    serializeUser,
    checkRole
} = require('../utils/Auth')

//User Registration
router.post('/register-user', async (req, res) => {
    await userRegister(req.body, 'user', res);
})
//Admin Registration
router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, 'admin', res);

})
//Super AdminRegistration
router.post('/register-super-admin', async (req, res) => {
    await userRegister(req.body, 'super-admin', res);

})
//User Login
router.post('/login-user', async (req, res) => {
    await userLogin(req.body, 'user', res);
})

//Admin Login
router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, 'admin', res);
})

//SuperAdmin Login
router.post('/login-super-admin', async (req, res) => {
    await userLogin(req.body, 'super-admin', res);
})

//Profile Route
router.get("/profile", userAuth, async (req, res) => {

    return res.json(serializeUser(req.user))
})

//Users Protector Route
router.get('/user-protected', userAuth, checkRole(['user']), async (req, res) => {
    return res.json("Hello User!!")
})

//Admin Protected
router.get('/admin-protected', userAuth, checkRole(['admin']), async (req, res) => {
    return res.json("Hello Admin")
})

//SuperAdmin Protected
router.get('/super-admin-protected', userAuth, checkRole(['super-admin']), async (req, res) => {
    return res.json("Hello Super-admin")
})

router.get('/super-admin-and-admin-protected', userAuth, checkRole(['super-admin','admin']), async (req, res, next) => {
    return res.json("Hey Admins!!!!")
})


module.exports = router;