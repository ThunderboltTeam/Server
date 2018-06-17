const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');		// crypto 모듈의 promise 버전
const db = require('../module/pool.js');

// s3 - image upload 추가
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config/aws_config.json');
const s3 = new aws.S3();
const upload = require('../config/multer.js');

// POST 방식, ip:3000/signup
router.post('/', upload.array('user_image'), async (req, res) => {
	let user_email = req.body.user_email;
	let user_pw = req.body.user_pw;
	let user_name = req.body.user_name;
	let user_age = req.body.user_age;
	let user_sex = req.body.user_sex;
	let user_phone = req.body.user_phone;
	let user_image = req.file;

	//console.log("44444444444 : " + req.files[0].location);

	if (!user_email || !user_pw) {
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let checkQuery = 'SELECT * FROM user WHERE user_email = ?';		// 입력받은 user_id DB에 존재하는지 확인
		let checkResult = await db.queryParam_Arr(checkQuery, [user_email]);

		if (!checkResult) {												// 정상적으로 query문이 수행되지 않았을 경우
			res.status(500).send({
				message : "Internal Server Error"
			});
		} else if (checkResult.length === 1) {		// 배열의 길이 === 1 => DB에 user_id가 존재
			res.status(400).send({
				message : "Already Exists"
			});
		} else {																	// DB에 존재하지 X
			const salt = await crypto.randomBytes(32);			// salt
	    const hashedpwd = await crypto.pbkdf2(user_pw, salt.toString('base64'), 100000, 32, 'sha512');		// password 해싱

	    let insertQuery = 'INSERT INTO user (user_email, user_salt, user_pw, user_name, user_age, user_sex, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?)';
	    let insertQuery2 = 'INSERT INTO user (user_email, user_salt, user_pw, user_name, user_age, user_sex, user_phone, user_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

	    if (req.files[0] == null) {
	    	console.log("no image");
	    	let insertResult = await db.queryParam_Arr(insertQuery, [user_email, salt.toString('base64'), hashedpwd.toString('base64'), user_name, user_age, user_sex, user_phone]);

			if (!insertResult) {										// 정상적으로 query문이 수행되지 않았을 경우
				res.status(500).send({
					message : "Internal Server Error"
				});
			} else {
				res.status(201).send({
					message : "Successfully Sign Up"
				});
			}
		}
		else {
			let insertResult2 = await db.queryParam_Arr(insertQuery2, [user_email, salt.toString('base64'), hashedpwd.toString('base64'), user_name, user_age, user_sex, user_phone, req.files[0].location]);
			console.log("55555555 : " + req.files[0].location);
			if (!insertResult2) {										// 정상적으로 query문이 수행되지 않았을 경우
				res.status(500).send({
					message : "Internal Server Error"
				});
			} else {
				res.status(201).send({
					message : "Successfully Sign Up"
				});
			}
		}






	}
}
});

module.exports = router;