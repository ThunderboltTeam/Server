const express = require('express');
const router = express.Router();

router.use('/signup', require('./signup.js'));	// ip:3000/signup
router.use('/signin', require('./signin.js'));	// ip:3000/signin

// location 불러오기
router.use('/location', require('./location.js'));
// category 불러오기
router.use('/category', require('./category.js'));



//router.use('/', require('./board/index.js'));		// ip:3000/
module.exports = router;
