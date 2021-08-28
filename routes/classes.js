var express = require("express");
const pool = require("../db");
var router = express.Router();

//Completed
router.get("/:coursecode", function (req, res, next) {
  var code = req.params.coursecode;
  pool.connect();
  pool.query(
    "select *from class where coursecode = $1",
    [code],
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.send(resp.rows);
      }
    }
  );
});

module.exports = router;
