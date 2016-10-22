var express = require('express');  // require express
var app = express();  // create a request handler function
var server = require('http').createServer(app);  // use our app to create a server
var io = require('socket.io')(server); // pass in our http app server to get a Socket.io server
var path = require('path');
var logger = require("morgan");
var bodyParser = require("body-parser");
var ejs =  require('ejs');

app.get('/', function(req, res){
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../A03Mutyala/assets', 'bootstrap.html'));
});
/*app.get('/', function(req, res){
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../A03/assets', 'contact.html'));
});*/
 
 app.use(express.static(__dirname+'/views'))
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine

// manage our entries
var entries = [];
app.locals.entries = entries;
// set up the logger
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// on a GET request to default page, do this.... 
app.get('/', function(req, res){
      res.render('index');
});

app.get('/guestbook', function(req,res){
  res.render('index');
});
 app.post('/guestbook', function(req,res){
   res.render('index');
 });

 // http POST (INSERT)
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  console.log(entries.length);
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
   console.log(entries.length);
  response.redirect("/guestbook");
  res.render('index');
});
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

 
// Listen for an app request on port 8081
server.listen(8081, function(){
  console.log('listening on http://127.0.0.1:8081/');
});




