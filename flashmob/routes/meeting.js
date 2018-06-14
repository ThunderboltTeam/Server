const express = require('express')
const router = express.Router();

const db = require('../module/pool.js');

// GET 방식
router.get('/', async (req, res) => {
   
  let getMeetingListQuery = 'SELECT * FROM meeting';      // board_idx 최신 순으로 정렬
  let getMeetingList = await db.queryParam_None(getMeetingListQuery);

   if (!getMeetingList) {
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


// POST방식
router.post('/', async (req, res) => {
   let meet_title = req.body.meet_title;
   let meet_date = req.body.meet_date;
   let meet_place = req.body.meet_place;
   let meet_people_num = req.body.meet_people_num;
   let meet_memo = req.body.meet_memo;
   let cate_id = req.body.cate_id;
   let loca_id = req.body.loca_id;
   let leader_id = req.body.leader_id;


   if( !meet_title || !meet_date || !meet_place || !meet_people_num || !cate_id || !loca_id || !leader_id) {
      res.status(400).send({
         message : "NULL Value"
      });
   }
   else {
      let registerMeetingQuery = 'INSERT INTO meeting (meet_title, meet_date, meet_place, meet_people_num, meet_memo, cate_id, loca_id, leader_id) VALUES (?,?,?,?,?,?,?,?)';

      let registerMeeting = await db.queryParam_Arr(registerMeetingQuery, [meet_title, meet_date, meet_place, meet_people_num, meet_memo, cate_id, loca_id, leader_id]);

      if(!registerMeeting) {
         res.status(500).send({
            message : "Server Error"
         });
      }
      else {
         res.status(201).send({
            message : "Sucessful Register Meeting"
         });
      }
   }


});

module.exports = router;