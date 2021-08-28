var express = require("express");
var router = express.Router();

const pool = require("../db");
var fs = require("fs");
var ip = require("ip");

router.post("/", function (req, res, next) {
  pool.connect();
  pool.query(
    "select count(*) from student where roll=$1",
    [req.query.roll],
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        if (resp.rows[0].count == 0) {
          var roll = req.query.roll;
          roll = roll.toUpperCase();
          pool.query(
            "insert into student values($1,$2)",
            [req.query.roll, req.query.name],
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
