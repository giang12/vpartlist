var vPartList = require('./lib/vpartlist'),
    path = require('path');

var res = ["./sample_a/", "./sample_b"],
    des = "./sandbox/example",
    mod = "./sample_a/shifter/shifter.v";
   
new vPartList(path.resolve(mod), {
    path: false,
    repositories: res,
    output: path.resolve(des),
    verbose: true //should see some output in terminal
}, function(mod, err) {
    console.log(mod);
});
