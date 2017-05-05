const env = require('dotenv').config().parsed;
const colors = require('colors');
const reporter = require('vfile-reporter');
const analyze = require('./analyze');
const twitter = require('./twitter');
const parse = require('./parse');

module.exports = grade;
function grade(username, count) {
  username = username || env.DEFAULT_USERNAME;
  count = count || env.DEFAULT_COUNT;
  console.log('username'.blue, username);
  console.log('count   '.blue, count);
  console.log();
  twitter.timeline(username, count, error, success);
}

function error(err) {
  console.log(err);
}

function success(string) {
  var json = JSON.parse(string)
  var texts = parse(json);
  texts.forEach(t => analyze(t, report));
}

function report(err, file) {
  console.log('---')
  console.log(String(file).green);
  console.error(reporter(err || file, {
    quiet: true,
  }));
}
