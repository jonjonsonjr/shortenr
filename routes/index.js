var levelup = require('level');
var db = levelup('./db');
var counterKey = '0'; // This won't be a URL key, so it's safe
var counter = '1';
var bitStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
var bits = bitStr.split('');

/* grab counter for next URL input */
db.get(counterKey, function (err, value) {
  if (err) return console.log(err);
  counter = value;
});

/* POST to create URL */
exports.create = function (req, res) {
  var url = req.body.url;
  var hash = counter;
  counter = increment(counter);

  db.put(hash, url, function (err) {
    if (err) {
      console.log(err);
    }

    res.json({ url: 'http://localhost:3000/' + hash });
  });

  db.put(counterKey, counter, console.log);
};

/* GET to redirect */
exports.fetch = function (req, res) {
  var hash = req.params.hash;
  db.get(hash, function (err, url) {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    res.redirect(url);
  });
};

function increment(counter) {
  var cBits = counter.split('');
  var lastCh = cBits[cBits.length - 1];
  var result = '';

  for (var i = cBits.length - 1; i >= 0; i--) {
    var ch = cBits[i];

    if (ch == bits[bits.length - 1]) {
      // need to carry
      result = '0' + result;

      if (i == 0) {
        // carry out to new digit
        result = '0' + result;
      }
    } else {
      // don't need to carry anything else
      result = bits[bitStr.indexOf(ch) + 1] + result;
      return counter.substr(0, i) + result;
    }
  }

  return result;
}
