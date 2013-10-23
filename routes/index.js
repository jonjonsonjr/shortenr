var map = [];
var counter = 2;

/* GET home page */
exports.home = function (req, res) {
  res.json('Hello, world');
};

/* POST to create URL */
exports.create = function (req, res) {
  var url = req.body.url;
  var buf = new Buffer(Math.ceil((Math.log(counter) / Math.log(2) / 8)));
  buf.fill(counter);
  var hash = buf.toString('base64');
  hash = hash.replace(/\+/g, '-');
  hash = hash.replace(/\//g, '_');
  hash = hash.replace(/=/g, '');
  counter++;

  map[hash] = url;

  res.json('Pretend you created something: http://localhost:3000/' + hash);
};

/* GET to redirect */
exports.fetch = function (req, res) {
  var hash = req.params.hash;

  res.json(map[hash]);
};
