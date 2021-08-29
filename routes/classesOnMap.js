var express = require("express");
const pool = require("../db");
var router = express.Router();

/*  
    This route is used to get all the classes on the map.
    It returns a JSON object with the following structure:
    [
        {
            "id":"",
            "courseCode":"",
            "courseName":"",
            "faculty":"",
            "building":"",
            "time":"",
            "studentRegistered":,
            "location":[
                "lat":,
                "lon":,
            ]
        }
    ]
*/

router.get("/:courseCode", function (req, res, next) {
  var courseCode = req.params.courseCode;
  var data = [];

  //Query String to get all data needed
  var Query_1 =
    'select class.id,coursecode as "courseCode",course.name as course ,buildingname as building,facultyname as faculty ,time,studentregistered as "studentRegistered",lat,lon from class inner join building on class.buildingname = building.name inner join course on class.coursecode = course.id where coursecode = $1';
  pool.query(Query_1, [courseCode], function (err, result) {

    //Error handling
    if (err) {
      console.log(err);
      res.status(500).send({output:"Internal Server Error"});
    } else {

      //Add result to the data
      data = [];
      data = result.rows;

      //Loop through the data and add lat and lon under location
      for (let i = 0; i < data.length; i++) {
        data[i].location = [{ lat: data[i].lat, lon: data[i].lon }];
        delete data[i].lat;
        delete data[i].lon;
      }
      res.send(data);
    }
  });
});

module.exports = router;
