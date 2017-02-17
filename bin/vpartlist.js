#!/usr/bin/env node

var vPartList = require('../index');
var fs = require('fs');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
    alias: {
        o: 'output',
        r: 'repositories',
        p: 'path',
        v: 'verbose',
        h: 'help'
    },
    boolean: ['path', 'verbose'],
    string: ['output', 'repositories']
});

if (argv.help) {
    fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
    return;
}

var part = typeof argv._[0] === 'string' ? argv._.shift() : undefined;

argv.r = argv.repositories = argv.r ? [argv.r].concat(argv._) : undefined; 

var _log = argv.v ? console.log : function(){};

_log(part, argv);

return (new vPartList(part, argv, function(_mod, err) {
    if (err) {
         console.log(err.name + ":", err.message);
         _log(err.stack);
         process.exit(1);
    }
    console.log(_mod.name, "(" + _mod.partlist.length, "components):");
    console.log(_mod.partlist.join(" "));
}));
