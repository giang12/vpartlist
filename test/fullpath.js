var t = require('tap'),
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');

var src = path.resolve("./src/"),
    des = "./sandbox/alu",
    mod = "./alu/alu.v";

t.jobs = 2;
/**
 * test --path option
 */

t.test("should include full path to components", function(t) {
    new vPartList(path.join(src, mod), {
        path: true,
        repository: src
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
        path: false,
        repository: src
    }, function(mod, err) {
        t.ifError(err);
        for (var i = 0; i < mod.partlist.length; i++) {
            t.ok(mod.partlist[i].indexOf(src) < 0, "should not include fullpath to " + mod.partlist[i]);
        }
        t.end();
    });
});