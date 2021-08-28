var express = require("express");
const pool = require("../db");
var router = express.Router();

//Completed
router.get("/:studentId", function (req, res, next) {
  var studentId = req.params.studentId;
  pool.query(
    "select *from class where id in (select classid from sclass where roll=$1)",
    [studentId],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Internal server error");
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
});

//Detect clash

function checkClash(cal, startTime, endTime) {
  let l = 0,
    r = cal.length - 1;
  while (l <= r) {
    const mid = Math.floor((r + l) / 2);
    const [s, e] = cal[mid];
    if (s < endTime && startTime < e) return false;
    if (startTime >= e) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  // The splice makes it O(n)
  this.cal.splice(l, 0, [startTime, endTime]);
  return true;
}

router.post("/:studentId", function (req, res, next) {
  var studentId = req.params.studentId;
  studentId = studentId.toUpperCase();
  var classId = req.body.classId;
  var calender = [[], [], [], [], []];
  var weekDay = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"];
  pool.query(
    "select time from class where id in (Select classid from sclass where roll=$1)",
    [studentId],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Internal server error");
      } else {
        for (let i = 0; i < result.rows.length; i++) {
          var arr = result.rows[i].time.split(" ");
          var timearr = arr[1].split("-");
          var sdayHour = timearr[0].slice(1, 2);
          var edayHour = timearr[1].slice(1, 2);
          var stime, etime;
          sdayHour == "pm"
            ? (stime = parseInt(timearr[0].slice(0)) + 12)
            : (stime = parseInt(timearr[0].slice(0)));
          edayHour == "pm"
            ? (etime = parseInt(timearr[1].slice(0)) + 12)
            : (etime = parseInt(timearr[1].slice(0)));
          var dayIndex = weekDay.indexOf(arr[0]);
          calender[dayIndex].push([stime, etime]);
        }
        pool.query(
          "select time from class where id = $1",
          [classId],
          function (err, classTime) {
            if (err) {
              console.log(err);
              res.status(500).send("Internal server error");
            } else {
              var arr = result.rows[0].time.split(" ");
              var timearr = arr[1].split("-");
              var sdayHour = timearr[0].slice(1, 2);
              var edayHour = timearr[1].slice(1, 2);
              var stime, etime;
              sdayHour == "pm"
                ? (stime = parseInt(timearr[0].slice(0)) + 12)
                : (stime = parseInt(timearr[0].slice(0)));
              edayHour == "pm"
                ? (etime = parseInt(timearr[1].slice(0)) + 12)
                : (etime = parseInt(timearr[1].slice(0)));
              var dayIndex = weekDay.indexOf(arr[0]);
              if (checkClash(calender[dayIndex], stime, etime)) {
                pool.query(
                  "insert into sclass values ($1,$2)",
                  [studentId, classId],
                  function (err, additionResult) {
                    if (err) {
                      console.log(err);
                      res.status(500).send("Internal server error");
                    } else {
                      pool.query(
                        "update class set studentregistered = studentregistered+1 where id = $1",
                        [classId],
                        function (err, resultUpdate) {
                          if (err) {
                            console.log(err);
                            res.status(500).send("Internal server error");
                          } else {
                            res.status(200).send("Class Added");
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                res.send("Clash");
              }
            }
          }
        );
      }
    }
  );
});

//Completed Implementation

router.delete("/:studentId/:classId", function (req, res, next) {
  var studentId = req.params.studentId;
  var classId = req.params.classId;
  var query = "DELETE FROM sclass WHERE roll = $1 AND classid = $2";
  pool.connect();
  pool.query(query, [studentId, classId], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var query_2 =
        "update class set studentregistered =studentregistered-1 where id = $1;";
      pool.query(query_2, [classId], function (err, remove) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
