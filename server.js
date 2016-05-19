// ************************************************
// Server
// ************************************************
var restify = require('restify');
var server = restify.createServer();
server.use(restify.queryParser());

server.get('/queryWithArray', function main (req, res) {
  console.log("itemArray on server side: ", req.query.itemArray);
  res.send({itemArray: req.query.itemArray});
});

var port = 1337;
server.listen(port, function() {
  console.log('Server started on port ' + port);
});


// ************************************************
// Send requests using request
// ************************************************
var P = require('bluebird');
var request = P.promisifyAll(require('request'));

requestExample = function (itemArray) {
  console.log("itemArray before request: ", itemArray);
  return request.getAsync('http://localhost:1337/queryWithArray', {
    qs: {itemArray: itemArray},
    json: true
  }).then(function (results) {
    return results.body;
  });
};

P.all([
  requestExample(["item 1", "item 2"]),
  requestExample(["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8", "item 9", "item 10", "item 11", "item 12", "item 13", "item 14", "item 15", "item 16", "item 17", "item 18", "item 19", "item 20", "item 21", "item 22"])
])
.then(function (results) {
  console.log("itemArray after request:");
  console.log("Correctly parsed small array: ", results[0].itemArray);
  console.log("Incorrectly parsed large array: ", results[1].itemArray);
})
.catch(function (err) {
  console.log(err);
});


// ************************************************
// Send requests using superagent
// ************************************************
var srequest = require('superagent');

superagentExample = function (itemArray) {
  return new Promise (function (accept, reject) {
  console.log("itemArray before superagent: ", itemArray);
    srequest
      .get('http://localhost:1337/queryWithArray')
      .query({itemArray: itemArray})
      .end(function (err, results) {
        accept(results.body);
      });
  });
};

P.all([
  superagentExample(["item 1", "item 2"]),
  superagentExample(["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8", "item 9", "item 10", "item 11", "item 12", "item 13", "item 14", "item 15", "item 16", "item 17", "item 18", "item 19", "item 20", "item 21", "item 22"])
])
.then(function (results) {
  console.log("itemArray after superagent:");
  console.log("Correctly parsed small array: ", results[0].itemArray);
  console.log("Correctly parsed large array: ", results[1].itemArray);
})
.catch(function (err) {
  console.log(err);
});