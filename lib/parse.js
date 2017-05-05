const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

module.exports = parse;
function parse(input) {
  if (typeof input === 'string') input = JSON.parse(input);
  return reduce(input);
}

function reduce(data) {
  var texts = data
    .map(clean)
    .reverse()
    .filter(t => t)
    .filter(t => !t.startsWith('EO') && !t.startsWith('#'))
  var prev = {acc: [], buf: []};
  return texts
    .reduce(connectReduce, prev).acc;
}

function connectReduce({acc, buf}, string) {
  var startsWith = getLen.bind(null, string, 'startsWith');
  var endsWith = getLen.bind(null, string, 'endsWith');

  var endLen = endsWith('...') || endsWith('…');
  var startLen = endLen || startsWith('...') || startsWith('…');

  if (endLen) {
    buf.push(string.slice(0, string.length - endLen).trim());
  } else if (startLen) {
    buf.push(acc.pop());
    buf.push(string.slice(startLen, string.length).trim());
    acc.push(buf.join(' '));
    buf = [];
  } else if (buf.length) {
    buf.push(string);
    acc.push(buf.join(' '));
    buf = [];
  } else {
    acc.push(string);
  }

  return {acc, buf};
}

function clean({text}) {
  text = text
    .replace('’', "'")
    .trim();
  return entities.decode(text);
}

function getLen(string, method, substring) {
  if (string[method](substring)) return substring.length;
  return 0;
}
