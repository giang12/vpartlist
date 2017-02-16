/**
 * if no --repo src is supplied
 * vPartlist should look for components under the same directory of requested part
 */

var test = require('tap').test,
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');

var src = "./sample_src/",
    des = "./sandbox/no_src_repo",
    mod = "./alu/alu_hier_bench.v";

var expected = {
    name: 'alu_hier_bench',
    partlist: [
    	'alu.v',
        "alu_hier.v",
        'alu_hier_bench.v'
        /**should be missing the rest of needed components**/
    ]
}

test("vPartlist should look for components under the same directory of requested component", function(t) {
    t.plan(4);
    new vPartList(path.join(src, mod), {
        repository: undefined,
        output: path.resolve(des),
        verbose: false
    }, function(mod, err) {
        t.ifError(err);
        t.equals(mod.name, expected.name);
        t.type(mod.partlist, 'Array');
        t.equals(mod.partlist.length, expected.partlist.length);
    });
});

test("Checking output", function(t) {

    for (var i = 0; i < expected.partlist.length; i++) {
        t.ok(fs.existsSync(path.join(des, expected.partlist[i])), expected.partlist[i] + " should be saved under " + des);
    }
    t.end();
});