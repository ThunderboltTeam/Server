const express = require('express');
const router = express.Router();

const db = require('../module/pool.js');			// queryParam_None, queryParam_Arr 두 개의 메소드

// GET 방식, ip:3000/location
router.get('/', async (req, res) => {
	
  let getLocationListQuery = 'SELECT * FROM location';
  let getLocationList = await db.queryParam_None(getLocationListQuery);

	if (!getLocationList) {
		res.status(500).send({
			message : "Internal Server Error"
		});
	} else {
		res.status(200).send({
			message : "Successful Get Location Data",
			data : getLocationList
		});
	}
});

module.exports = router;