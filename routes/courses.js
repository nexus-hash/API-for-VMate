var express = require("express");
const pool = require("../db");
var router = express.Router();

router.get('/',function(req,res,next){
  pool.connect();
  var Query="Select *from course";
  pool.query(Query,function(err,result){
    if(err) res.send({output:"Internal Server Error"});
    else{
      res.send(result.rows);
    }
  })
})

module.exports = router;