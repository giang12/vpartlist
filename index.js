#!/usr/bin/env node

var vPartList = require('./lib/vpartlist');
var fs = require('fs');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
    alias: { p: 'path', h: 'help' },
    boolean: [ 'path' ]
});

if (argv.help) {
    fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
    return;
}

var paths = argv._.shift();

return require.main === module ?
    (new vPartList(paths, argv , function(list, err) {
        if (err) {
            return console.log(err)
        }
        console.log(list.join(" "));
    })) : (module.exports = vPartList);

