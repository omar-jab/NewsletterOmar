const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const listID = "b7863afc48";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function(req, res){
    //console.log("Ciao!");
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res){
    
    const nome = req.body.nomeForm;
    const email = req.body.emailForm;

    console.log(nome, email)
    //res.send("ciao!")

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields :{
                    FNAME : nome,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/"+listID;
    const options = {
        method: "POST",
        auth: "omarjab01:6550eb0aba663084ed6df36294509316-us10"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server in ascolto sulla porta 3000.");
})


// api key
// 6550eb0aba663084ed6df36294509316-us10

// List id

