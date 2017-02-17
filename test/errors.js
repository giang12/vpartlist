var t = require('tap'),
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');

t.jobs = 12; //run test in parallel, the value doesnt matter aslong as >1
var src = "./sample_a/",
    des = "./sandbox/errors",
    mod = "./alu/alu.v";

var _errT = function(t, mod, err, s ){

    t.equals(mod, null, "result should be null");
    t.type(err, 'object', "error is defined");
    t.equals(err.name, 'PError', "error should be of type PError");
    t.ok(err.message.indexOf(s) > -1);
    return t;
}
t.test("no specified module", function(t) {
    new vPartList(null, null, function(mod, err) {
        _errT(t, mod, err, "Missing arguments").end();
    });
});
t.test("non-existing module", function(t) {
    new vPartList("foo/foo/foo.v", null, function(mod, err) {
        _errT(t, mod, err, "what's you smoking?").end();
    });

});
t.test("not a .v file", function(t) {
    new vPartList("package.json", null, function(mod, err) {
        _errT(t, mod, err, "Only `.v` yo! what's you drinking?").end();
    });
});

t.test("invalid repositories directory", function(t) {
    t.jobs = 2;

    t.test("no repos avail", function(t) {
        new vPartList(path.join(src, mod), {
            repositories: path.join(src, mod),
        }, function(mod, err) {
            _errT(t, mod, err, "no repos avail, what's you tweaking?").end();
        });
    });

   t.end();
});

t.test("saving error (--output option)", function(t){
	new vPartList(path.join(src, mod), {
			repositories: [src],
			output: path.join(src, mod)
		}, function(mod, err) {
        t.equals(mod, null, "result should be null");
        t.type(err, 'object', "error is defined");
        t.equals(err.name, 'PError', "error should be of type PError");
        t.end();
    });

});
