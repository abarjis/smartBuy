const express = require('express');
const router = express.Router();

const { registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    userProfile,
    updateProfile,
    updatePassword,
    allUsers,
    userDetails } = require('../controllers/authController');


    const { isValidUser, validRoles } = require('../middlewares/userAuth');



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/profile').get(isValidUser, userProfile)


router.route('/profile/update').put(isValidUser, updateProfile)
router.route('/password/update').put(isValidUser, updatePassword)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)


/*
Admin Routes
*/
router.route('/admin/users').get(isValidUser, validRoles('admin'), allUsers)
router.route('/admin/user/:id').get(isValidUser, validRoles('admin'), userDetails)



module.exports = router;