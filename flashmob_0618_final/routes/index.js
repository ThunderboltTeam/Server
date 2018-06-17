const express = require('express');
const router = express.Router();

router.use('/signup', require('./signup.js'));	// ip:3000/signup
router.use('/signin', require('./signin.js'));	// ip:3000/signin

// location 불러오기
router.use('/location', require('./location.js'));
// category 불러오기
router.use('/category', require('./category.js'));

// meeting post
router.use('/meeting', require('./meeting.js'));

// meeting 이름별 불러오기
router.use('/meetingData', require('./meetingData.js'));

module.exports = router;
