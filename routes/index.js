var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var mysql = require('./mysql.js');
var eventful = require('eventful-node');
var client = new eventful.Client("gFNTdP3rLVhWS6rw");

function home(req,res){
	res.render('index', { title: 'Student Ghar'});
}

function events(req,res){
	var keyword = req.param("keyword");
console.log("keyword user entered is " +keyword );
 	var query="select * from events where eventid=?";
 	var params=[keyword];
 	mysql.fetchData(query,params,function(err,results){
			if(err){
				console.log(err);
				res.send({"status":"fail","msg":"Error occured while fetching data from server"});
			}
			else {
				res.send({"status":"success","results":results});
			}
	});
}

/*function admin(req,res){
	if(!req.session.user_id){
		res.send({"status":"fail","msg":"You need to login in order to access this page"});	
	}
	else{
		res.render('admin', { title: 'Courses'});
	}
}*/

router.get('/getEventCounts',function(req,res) {
  var category = req.param("category");
 console.log(category);
  var qry = "select region_name, region_abbr, count(*) as noOfEvents from events where eventid = ? group by region_abbr , region_name";
  var params = [category];
  mysql.fetchData(qry,params,function(err,results){
    if(err) {
      console.log(err);
      res.statusCode = 500;
      var obj = {
        status: "failed",
        msg: err
      };
      res.send(JSON.stringify(obj));
    }else{
      console.log(results.length);
      var data = {
        status: "success",
        totalNoOfStates: results.length,
        eventCounts: results
      };
      res.statusCode = 200;
      res.send(JSON.stringify(data));
    }
  });
});



router.get('/',home);
router.post('/events',events);
module.exports = router;

