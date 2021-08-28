var express = require("express");
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false });

const pool = require("../db");
var fs = require("fs");
var ip = require("ip");

router.post("/",urlencodedParser ,function (req, res, next) {
  console.log(req.body);
  var roll = req.body.roll;
  roll=roll.toUpperCase();
  var studentName = req.body.name;
  pool.connect();
  pool.query(
    "select count(*) from student where roll=$1",
    [roll],
    function (err, resp) {
      if (err) {
        console.log(err);
        res.send("Internal Server Error");
      } else {
        if (resp.rows[0].count == 0) {
          pool.query(
            "insert into student values($1,$2)",
            [roll, studentName],
            function (erro, respo) {
              if (erro) {
                console.log(erro);
              } else {
                res.send("Student Added");
              }
            }
          );
        } else {
          res.send("Student Alreay exists");
        }
      }
    }
  );
});

router.get("/:roll", function (req, res, next) {
  var roll = req.params.roll;
  roll = roll.toUpperCase();
  pool.connect();
  pool.query(
    "select count(*) from student where roll =$1",
    [roll],
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        if (resp.rows[0].count == 0) {
          res.send("Student Not Found");
        } else {
          pool.query(
            "select * from student where roll =$1",
            [roll],
            function (err, respo) {
              if (err) {
                console.log(err);
              } else {
                res.send(respo.rows[0]);
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
