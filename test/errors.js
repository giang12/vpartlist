var t = require('tap'),
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');

t.jobs = 12; //run test in parallel, the value doesnt matter aslong as >1
var src = "./sample_src/",
    des = "./sandbox/alu",
    mod = "./alu/alu.v";

t.test("no specified module", function(t) {
    new vPartList(null, null, function(mod, err) {
        t.equals(mod, null, "result should be null");
        t.type(err, 'object', "error is defined");
        t.equals(err.name, 'PError', "error should be of type PError");
        t.end();
    });
});
t.test("non-existing module", function(t) {
    new vPartList("foo/foo/foo.v", null, function(mod, err) {
        t.equals(mod, null, "result should be null");
        t.type(err, 'object', "error is defined");
        t.equals(err.name, 'PError', "error should be of type PError");
        t.end();
    });

});
t.test("not a .v file", function(t) {
    new vPartList("package.json", null, function(mod, err) {
        t.equals(mod, null, "result should be null");
        t.type(err, 'object', "error is defined");
        t.equals(err.name, 'PError', "error should be of type PError");
        t.end();
    });
});

t.test("invalid repository directory", function(t) {
    t.jobs = 2;

    t.test("missing repository directory", function(t) {
        new vPartList(path.join(src, mod), {
            repository: "./foo/",
        }, function(mod, err) {
            t.equals(mod, null, "result should be null");
            t.type(err, 'object', "error is defined");
            t.equals(err.name, 'PError', "error should be of type PError");
            t.end();
        });
    });

    t.test("not a directory", function(t) {
        new vPartList(path.join(src, mod), {
            repository: path.join(src, mod),
        }, function(mod, err) {
            t.equals(mod, null, "result should be null");
            t.type(err, 'object', "error is defined");
            t.equals(err.name, 'PError', "error should be of type PError");
            t.end();
        });
    });

    t.end();
});

t.test("saving error (--output option)", function(t){
	new vPartList(path.join(src, mod), {
			repository: src,
			output: path.join(src, mod)
		}, function(mod, err) {
        t.equals(mod, null, "result should be null");
        t.type(err, 'object', "error is defined");
        t.equals(err.name, 'PError', "error should be of type PError");
        t.end();
    });

});