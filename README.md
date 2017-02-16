
# vpartlist 
[![Build Status](https://travis-ci.org/giang12/vpartlist.svg?branch=master)](https://travis-ci.org/giang12/vpartlist)

build a parts list for verilog module

# example

## example.js

```js
var vPartList = require('vpartlist'),
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
```

Output

```
{
    name: 'alu',
    partlist: [
        "alu.v", "inverter_16bit.v", "shifter.v", "and2_16bit.v", "xor2_16bit.v", "or2_16bit.v", "cla_16bit.v", "mux4_1_16bit.v", "mux2_1_16bit.v", "nor16.v", "overflow_detector.v", "and2.v", "inverter.v", "shifter_level_0.v", "shifter_level_1.v", "shifter_level_2.v", "shifter_level_3.v", "xor2.v", "or2.v", "clb4.v", "cla.v", "cla_4bit.v", "mux4_1.v", "mux2_1.v", "not1.v", "shifter_lsb_msb.v", "nand2.v"
    ]
}

```

# methods

```js
  vPartList(component, opts, callback, undefined)
  Build a part list for a component
  @param  String   component fullpath/to/module.v
  @param  Object   opts      {
                                 "repository": undefined,
                                 "output": undefined, //NOPE
                                 "path": false,
                                 "verbose": false
                              }
  @param  function callback  (result, err){
            @err = {name: PError, message:, stack:,}
            @result = {name:, partlist:,}
          }
```

# usage

This package also ships with a `vpartlist` command.

```
usage: vpartlist sample_src/alu/alu.v -vr sample_src/ -o sandbox/alu 

  build a parts list for `alu.v` module from components found under `sample_src/`
  and save all components to `sandbox/alu` (create dir if not existed)

FLAGS:
	-h, --help		help
	-r repoDir/, --repository=reporDir/		root directory of verilog source code 
      (DEFAULT to parent directory of requested module, e.g sample_src/alu/ for sample_src/alu/alu.v)
	-o dir/, --output=dir/	output directory
      (DEFAULT no output if undefined)
	-v, --verbose	verbose log
	-p, --path		include full path to each components 

```

# install

With [npm](http://npmjs.org) do:

```
npm install vpartlist --save
```

to get the library, or

```
npm install -g vpartlist
```

to get the command.
