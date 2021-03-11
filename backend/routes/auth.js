const express = require('express');
const router = express.Router();

const { registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    userProfile } = require('../controllers/authController');


    const { isValidUser, validRoles } = require('../middlewares/userAuth');



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(isValidUser, userProfile)


router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)


router.route('/logout').get(logoutUser);

module.exports = router;