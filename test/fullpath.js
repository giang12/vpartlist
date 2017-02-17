var t = require('tap'),
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');

var src = path.resolve("./sample_a/"),
    mod = "./alu/alu.v";

t.jobs = 2;
/**
 * test --path option
 */

t.test("should include full path to components", function(t) {
    new vPartList(path.join(src, mod), {
        repositories: src,
        path: true,
    }, function(mod, err) {
        t.ifError(err);
        for (var i = 0; i < mod.partlist.length; i++) {
            t.ok(mod.partlist[i].indexOf(src) >= 0, "should include fullpath to " + mod.partlist[i]);
        }
        t.end();
    });
});


t.test("should not include full path to components", function(t) {
    new vPartList(path.join(src, mod), {
        repositories: src,
        path: false,
    }, function(mod, err) {
        t.ifError(err);
        for (var i = 0; i < mod.partlist.length; i++) {
            t.ok(mod.partlist[i].indexOf(src) < 0, "should not include fullpath to " + mod.partlist[i]);
        }
        t.end();
    });
});
