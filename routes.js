const express = require('express');
const bodyParser = require('body-parser');
const { useReducer } = require('react');
const mysql = require('mysql');

const connection = mysql.createPool({
    host        : 'tethys.cse.buffalo.edu',
    port        : '3306',
    user        : 'johnbrag',
    password    : '50233312' ,
    database    : 'johnbrag_db'   
});

const app = express();

app.get('/users', function(req,res){

    connection.getConnection(function(err,connection){
      /*  console.log("in the insert");
        var sql = "INSERT INTO `UserInfo` (Username, Passwd, Email, ProfilePic) VALUES ('Youthli', 'password','upperMiddle@gmail.com','https//:greatoutdoors.com')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
        
    */

        connection.query('SELECT * FROM `UserInfo`', function(error,results,fields){

            if(error) throw error;

            res.send(results);
        });
    });
});

app.listen(3000, () => {
    console.log('Go to http://localhost:3000/users so you can see the data.');
   });
   