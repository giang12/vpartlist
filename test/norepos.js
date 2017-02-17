var test = require('tap'),
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');


var src = "./sample_a/",
    des = "./sandbox/no_repos",
    mod = "alu/alu.v";

new vPartList(path.join(src, mod), {
    repositories: ['sdfdsad', 'dsad' ,'a', 'fs', path.join(src, mod), 'fooo/foo'],
    output: path.resolve(des),
    verbose: false
}, function(mod, err) {
	test.equals(mod, null, "result should be null");
    test.type(err, 'object', "error is defined");
    test.equals(err.name, 'PError', "error should be of type PError");
    test.ok(err.message == "no repos avail, what's you tweaking?", err.message);
});
