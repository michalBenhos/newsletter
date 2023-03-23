const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    var data = {
        members: [
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

    const url = "https://us21.api.mailchimp.com/3.0/lists/4252bad7ae";

    const Options = {
        method: "post",
        auth: "michalb77:229c4bb7860d71c46fbdab422c74ca19-us21"
    }
    
    const request = https.request(url, Options, function(response) {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);

    request.end();



})

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
  });





// no- be1c8e819d87ec07316129f5645fab98-us21
//229c4bb7860d71c46fbdab422c74ca19-us21
//4252bad7ae
