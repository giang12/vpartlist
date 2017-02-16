var test = require('tap').test,
    fs = require('fs'),
    path = require('path'),
    vPartList = require('../index');

var src = "./sample_src/",
    des = "./sandbox/alu",
    mod = "./alu/alu.v";
var expected = {
    name: 'alu',
    partlist: ['alu.v',
        'inverter_16bit.v',
        'shifter.v',
        'and2_16bit.v',
        'xor2_16bit.v',
        'or2_16bit.v',
        'cla_16bit.v',
        'mux4_1_16bit.v',
        'mux2_1_16bit.v',
        'nor16.v',
        'overflow_detector.v',
        'and2.v',
        'inverter.v',
        'shifter_level_0.v',
        'shifter_level_1.v',
        'shifter_level_2.v',
        'shifter_level_3.v',
        'xor2.v',
        'or2.v',
        'clb4.v',
        'cla.v',
        'cla_4bit.v',
        'mux4_1.v',
        'mux2_1.v',
        'not1.v',
        'shifter_lsb_msb.v',
        'nand2.v'
    ]
}

test("Simple success building `alu.v`", function(t) {
    t.plan(4);
    new vPartList(path.join(src, mod), {
        path: false,
        repository: src,
        output: path.resolve(des),
        verbose: false
    }, function(mod, err) {
        t.ifError(err);
        t.equals(mod.name, expected.name);
        t.type(mod.partlist, 'Array');
        t.equals(mod.partlist.length, expected.partlist.length);
    });
});

test("Checking output for alu.v built", function(t) {

    for (var i = 0; i < expected.partlist.length; i++) {
        t.ok(fs.existsSync(path.join(des, expected.partlist[i])), expected.partlist[i] + " should be saved under " + des);
    }
    t.end();
});