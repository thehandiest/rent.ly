var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  port = 8090,
  headers = {
   'Content-Type' : 'application/x-www-form-urlencoded'
  };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {

  var status = 'Rently';

  res.end(status, 200);
});

app.run = function() {
  app.listen(port, function() {
    console.log('Server listening on port %s', 8090);
  });
};

module.exports = exports = app.run();
