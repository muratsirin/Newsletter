const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields:{
                  FNAME: name,
                  LNAME: lastName,
              }
          }
      ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/704f99c93b";
  const options = {
      method: "POST",
      auth: "muratsirin:9b087392a77d47c13083848285398321-us20",
  }

  const request = https.request(url, options,function(response){
      response.on("data", function(data){
          console.log(JSON.parse(data));
      });

      if(response.statusCode === 200){
          res.sendFile(__dirname + "/success.html");
      }else{
          res.sendFile(__dirname + "/failure.html");
      }
  });

  request.write(jsonData);
  request.end();

  console.log(name + lastName + email);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

//9b087392a77d47c13083848285398321-us20
// 704f99c93b
//https://us6.api.mailchimp.com/3.0/