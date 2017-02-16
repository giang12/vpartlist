var vPartList = require('./lib/vpartlist'),
    path = require('path');

var src = "./sample_src/",
    des = "./sandbox/alu",
    mod = "alu/alu.v";
new vPartList(path.join(src, mod), {
    path: false,
    repository: src,
    output: path.resolve(des),
    verbose: true //should see some output in terminal
}, function(mod, err) {
    console.log(mod);
});
