//jshint esversion: 6
const express  = require("express");

const request = require("request");
const bodyParser=require("body-parser");//used for post
const app = express();
const https  = require("https");

app.use(express.static("public"));//used for accesing css file and images
app.use(bodyParser.urlencoded({extended: true})); // used for post
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});



app.post("/",function(req,res){
   
    // console.log("post request recieve");

    var firstName = req.body.firstName;
    var lastName= req.body.lastName;
    var email = req.body.email;
   //console.log(firstName,lastName,email);
   //in form action / where post request  take place and method as post for post request


   var data ={
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
   };

         const jsonData = JSON.stringify(data);
         const url = "https://us12.api.mailchimp.com/3.0/lists/6b6b3c2e62";
  
       const options = {
           method: "POST",
           auth: "divyanshu:b411a528d38f47eefae738bd72b25463-us12"
        }
        const request = https.request(url, options, function(response){


             if(response.statusCode === 200){
                 res.sendFile(__dirname +"/success.html");
            }
            else{
                  res.sendFile(__dirname + "/failure.html");
            }
               response.on("data", function(data){
                  console.log(JSON.parse(data)); 
             });
            });

//request.write(jsonData);
  request.end();// read all post method 
});









// for failure and redirect
app.post("/failure",function(req,res){
res.redirect("/");// redirect to home "/"
});


app.listen(process.env.PORT, function(){
    console.log("server started at 3000");
});

//api key
//b411a528d38f47eefae738bd72b25463-us12
// list id
// 6b6b3c2e62.