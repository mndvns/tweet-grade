const grade = require('./lib/index');

const [count, username] = process.argv.slice(2);

grade(username, count);
