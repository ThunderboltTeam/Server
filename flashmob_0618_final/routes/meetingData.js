const express = require('express')
const router = express.Router();

const db = require('../module/pool.js');

router.get('/:meet_title', async(req, res) => {
   let meet_title = req.params.meet_title;
   let getMeetingTitleListQuery = 'SELECT * FROM meeting WHERE meet_title = ?';
   let getMeetingTitleList = await db.queryParam_Arr(getMeetingTitleListQuery, [meet_title]);

   if (!getMeetingTitleList) {
      res.status(500).send({
         message : "Internal Server Error"
      });
   } else {
      res.status(200).send({
         message : "Successful Get Meeting Data title",
         data : getMeetingTitleList
      });
   }
});


module.exports = router;