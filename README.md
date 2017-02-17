
# vpartlist 
[![Build Status](https://travis-ci.org/giang12/vpartlist.svg?branch=master)](https://travis-ci.org/giang12/vpartlist)

build a parts list for verilog module

# example.js

```js
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

```

Output

```
{ name: 'shifter',
  partlist: 
  [  'shifter.v',
     'shifter_level_0.v',
     'shifter_level_1.v',
     'shifter_level_2.v',
     'shifter_level_3.v',
     'shifter_lsb_msb.v',
     'mux4_1.v',
     'mux2_1.v',
     'not1.v',
     'nand2.v' 
  ] 
}
```

# methods

```js
  vPartList(component, opts, callback, undefined)
  Build a part list for a component
  @param  String   component fullpath/to/module.v
  @param  Object   opts      {
                                 "repositories": undefined,
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
usage: vpartlist sample_a/alu/alu.v -vr sample_a/ sample_b/ -o sandbox/foo 

  build a parts list for `alu.v` module from components found under [sample_a/, sample_b/]
  and save all components to `sandbox/foo` (create dir if not existed)

FLAGS:
  -h, --help    help
  -r repoDir/, --repositories=reporDir/   root directories of verilog source code 
      (DEFAULT to parent directory of requested module, e.g sample_a/alu/ for sample_a/alu/alu.v)
  -o dir/, --output=dir/  output directory
      (DEFAULT no output if undefined)
  -v, --verbose verbose log
  -p, --path    include full path to each components

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
