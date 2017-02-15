#!/usr/bin/env node

var vPartList = require('./lib/vpartlist');
var fs = require('fs');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
    alias: { o: 'output', p: 'path', v: 'verbose', h: 'help' },
    boolean: [ 'path', 'verbose' ],
    string: ['output']
});

if (argv.help) {
    fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
    return;
}

var paths = argv._.shift();

return require.main === module ?
    (new vPartList(paths, argv , function(_mod, err) {
        if (err) {
            return console.log(err)
        }
        console.log(_mod.name, "(" + _mod.partlist.length, "components):");
        console.log(_mod.partlist.join(" "));
    })) : (module.exports = vPartList);

