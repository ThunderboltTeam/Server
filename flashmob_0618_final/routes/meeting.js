const express = require('express')
const router = express.Router();

const db = require('../module/pool.js');

// GET 방식
router.get('/', async (req, res) => {
   
  let getMeetingListQuery = 'SELECT * FROM meeting';      
  let getMeetingList = await db.queryParam_None(getMeetingListQuery);

   if (!getMeetingList) {
      res.status(500).send({
         message : "Internal Server Error"
      });
   } else {
      res.status(200).send({
         message : "Successful Get Meeting Data",
         data : getMeetingList
      });
   }
});

router.get('/:category_id', async(req, res) => {
   let category_id = req.params.category_id;
   let getMeetingCateListQuery = 'SELECT * FROM meeting WHERE cate_id = ?';
   let getMeetingCateList = await db.queryParam_Arr(getMeetingCateListQuery, [category_id]);

   if (!getMeetingCateList) {
      res.status(500).send({
         message : "Internal Server Error"
      });
   } else {
      res.status(200).send({
         message : "Successful Get Meeting Category List",
         data : getMeetingCateList
      });
   }
});

// POST방식
router.post('/', async (req, res) => {
   let meet_title = req.body.meet_title;
   let meet_date = req.body.meet_date;
   let meet_people_num = req.body.meet_people_num;
   let meet_memo = req.body.meet_memo;
   let leader_id = req.body.leader_id;
   let cate_id = req.body.cate_id;
   let loca_id = req.body.loca_id;
   let meet_place_name = req.body.meet_place_name;
   let meet_place_address = req.body.meet_place_address;
   let meet_place_latitude = req.body.meet_place_latitude;
   let meet_place_longitude = req.body.meet_place_longitude;




   if( !meet_title || !meet_date || !meet_people_num || !leader_id || !cate_id || !loca_id || !meet_place_name || !meet_place_address || !meet_place_latitude || !meet_place_longitude) {
      res.status(400).send({
         message : "NULL Value"
      });
   }
   else {
      let registerMeetingQuery = 'INSERT INTO meeting (meet_title, meet_date, meet_people_num, meet_memo, leader_id, cate_id, loca_id, meet_place_name, meet_place_address, meet_place_latitude, meet_place_longitude) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

      let registerMeeting = await db.queryParam_Arr(registerMeetingQuery, [meet_title, meet_date, meet_people_num, meet_memo,leader_id, cate_id, loca_id, meet_place_name, meet_place_address, meet_place_latitude, meet_place_longitude]);

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