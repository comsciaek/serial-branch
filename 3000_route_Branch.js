var express = require("express");
var request = require("request");
var path = require("path");
const bodyParser = require("body-parser");

var app = express();
var staticPath = path.join(__dirname, "/");
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.get("/", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});
app.get("/login_page", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});

app.get("/product_page", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});

app.use(function (req, res, next) {
  var _send = res.send;
  var sent = false;
  res.send = function (data) {
    if (sent) return;
    _send.bind(res)(data);
    sent = true;
  };
  next();
});

// ROUTE GET
app.route("/gateway/get/routeapiget").post(verifyToken, function (req, res) {
  const { Urlpass, Datapass, Methodpass } = req.body;
  var headersOpt = {
    "content-type": "application/json",
  };
  console.log("/gateway/get/routeapiget-> " + Urlpass + "->" + new Date());
  request(
    {
      method: "get",
      url: Urlpass,
      headers: headersOpt,
      json: true,
    },
    function (error, response, body) {
      if (!error) {
        res.json(response.body);
      } else {
        res.json({ status: false, message: "No Connecttion" });
      }
    }
  );
});

// ROUTE POST/UPDATE
app.route("/gateway/post/routeapipost").post(verifyToken, function (req, res) {
  const { Urlpass, Datapass, Methodpass } = req.body;
  var headersOpt = {
    "content-type": "application/json",
  };
  console.log("/gateway/post/routeapipost->" + Urlpass + "->" + new Date());
  request(
    {
      method: "post",
      url: Urlpass,
      form: Datapass,
      headers: headersOpt,
      json: true,
    },
    function (error, response, body) {
      if (!error) {
        res.json(response.body);
      } else {
        res.json({ status: false, message: "No Connecttion" });
      }
    }
  );
});

function verifyToken(req, res, next) {
  var token = req.headers["mis-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ status: false, message: "No token provided." });
  if (token === "6yS1OVrZguKewgVIyjGs7BmrFqHYO0") {
    next();
  } else {
    return res
      .status(401)
      .send({ status: false, message: "No token provided." });
  }
}
app.set("port", process.env.PORT || 3000);
var server = app.listen(app.get("port"), function () {
  console.log("Server Font_Branc port 3000 Is.. Running");
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});
