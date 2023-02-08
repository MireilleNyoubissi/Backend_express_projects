// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + "/views/timestamp.html");
});

//

app.get("/api/timestamp", function (req, res) {
  res.json({ 
    unix: new Date().getTime(), 
    utc: new Date().toUTCString() 
  });
});
//
app.get("/api/timestamp/:date_string", function (req, res) {
  const time = req.params.date_string;
  if (parseInt(time) > 10000) {
    let unixTime = new Date(parseInt(time));
    res.json({
      unix: unixTime.getTime(),
      utc: unixTime.toUTCString(),
    });
  }
//
  if (new Date(time).toString() !== "Invalid Date") {
    res.json({
      unix: new Date(time).getTime(),
      utc: new Date(time).toUTCString(),
    });
  }
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
