const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"))

app.use(bodyparser.urlencoded({extended : true}));

app.listen(process.env.PORT || 3000,function(){
  console.log("port is running on port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.post("/",function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mail = req.body.mail;
  console.log(fname,lname,mail);

var data = {
    members : [
      {
        email_address : mail,
        status : "subscribed",
        merge_fields : {
          FNAME : fname,
          LNAME : lname
        }
      }
    ]
  };

var json_data = JSON.stringify(data);

var  OPTIONS = {
    url : "https://us19.api.mailchimp.com/3.0/lists/ac49e2c6d0",
    method : "POST",
    headers : {
      "Authorization" : "bika 4e19293357bf6f4191aaf361f293d2e5-us19"

    },
    body : json_data
  };

  request(OPTIONS ,function(error , response, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    }
    else {
      if (response.statusCode === 200)
      res.sendFile(__dirname + "/success.html");
      else
      res.sendFile(__dirname + "/failure.html");

    }


  });

});




//4e19293357bf6f4191aaf361f293d2e5-us19
//
//
//list id       ac49e2c6d0
