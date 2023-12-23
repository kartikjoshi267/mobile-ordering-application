const {Router} = require("express");
const router = Router();
const {login, register, getUser} = require('../controllers/user-controllers');
const {authenticateToken} = require("../middlewares/authentication");
const {check} = require("express-validator");

router.route('/register').post([check('username').notEmpty(), check('password').notEmpty(), check('email').notEmpty(), check('role').notEmpty()], register);
router.route('/login').post([check('username').notEmpty(), check('password').notEmpty()], login);
router.route('/').post(authenticateToken, getUser);

module.exports = router;