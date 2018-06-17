const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');			// queryParam_None, queryParam_Arr 두 개의 메소드

// GET 방식, ip:3000/board
router.get('/', async (req, res) => {
	
	let getBoardListQuery = 'SELECT * FROM board ORDER BY board_idx DESC';		// board_idx 최신 순으로 정렬
  let getBoardList = await db.queryParam_None(getBoardListQuery);

	if (!getBoardList) {
		res.status(500).send({
			message : "Internal Server Error"
		});
	} else {
		res.status(200).send({
			message : "Successful Get Board Data",
			data : getBoardList
		});
	}
});

// POST 방식, ip:3000/board
router.post('/', async (req, res) => {

	let user_idx = req.body.user_idx;
	let board_title = req.body.board_title;
	let board_content = req.body.board_content;
	
	if (!user_idx || !board_title || !board_content) {			// value가 제대로 들어오지 않았을 경우 에러 메세지 보내준다.
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let registerBoardQuery = 'INSERT INTO board (user_idx, board_title, board_content) VALUES (?, ?, ?)';
		// query문에 들어갈 runtime 시에 정해지는 value들을 배열의 형태로 queryParam_Arr 메소드에 넘겨줌
    let registerBoard = await db.queryParam_Arr(registerBoardQuery, [user_idx, board_title, board_content]);

		if (!registerBoard) {
			res.status(500).send({
				message : "Internal Server Error"
			});
		} else {
			res.status(201).send({
				message : "Successful Register Board Data",
			});
		}	
	}
});

module.exports = router;