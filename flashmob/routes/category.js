const express = require('express');
const router = express.Router();

const db = require('../module/pool.js');			// queryParam_None, queryParam_Arr 두 개의 메소드

// GET 방식, ip:3000/category
router.get('/', async (req, res) => {
	
  let getCategoryListQuery = 'SELECT * FROM category';
  let getCategoryList = await db.queryParam_None(getCategoryListQuery);

	if (!getCategoryList) {
		res.status(500).send({
			message : "Internal Server Error"
		});
	} else {
		res.status(200).send({
			message : "Successful Get Category Data",
			data : getCategoryList
		});
	}
});

module.exports = router;