var levelup = require('level');
var db = levelup('./db');
var counterKey = '0'; // This won't be a URL key, so it's safe
var counter = 2;

/* grab counter for next URL input */
db.get(counterKey, function (err, value) {
  if (err) return console.log(err);
  counter = value;
});

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

  db.put(hash, url, function (err) {
    if (err) {
      console.log(err);
    }

    res.json('http://localhost:3000/' + hash);
  });

  db.put(counterKey, counter, console.log);
};

/* GET to redirect */
exports.fetch = function (req, res) {
  var hash = req.params.hash;
  db.get(hash, function (err, value) {
    if (err) return res.json(err);
    res.json(value);
  });
};
