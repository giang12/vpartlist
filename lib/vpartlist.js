var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var dm = require('domain');
var mkdirp = require('mkdirp');
require('events').EventEmitter.defaultMaxListeners = 0;

module.exports = vPartList.vpartlist = vPartList.vPartList = vPartList;

/*
vpartlist.js

get part list of module X under modules/
tocheck = [X.v]
modules=[get all filename under modules/]
list = []
whileToCheck not empty
    checking = tocheck.slice();
    list.add(checking );
    for each token X in "checking" 
        if in [modules] and not in list[]
            tocheck.add(X)
        endif
    endfor
endwhile
ret {name: moduleName, partlist: [componentA, componentB]}
 */
function vPartList(paths, opts, callback, undefined) {

    var flags = _.merge({}, {
        "path": false,
        "output": "", //NOPE
        "verbose": false
    }, opts);

    var _log = (require.main === module || flags.verbose) ? console.log : (function() {});

    var PError = function(err) {
        _log(err);
        if (require.main === module) {
            process.exit(1);
        } else {
            //throw new Error(err);
            return donefailure(err); //bubble up
        }
    };
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
    var List = function() {
        this.parts = [];
    }
    List.prototype.add = function(part) {
        if (!this.has(part)) {
            this.parts.push(flags.path ? part : path.basename(part));
            return true;
        }
        return false;
    }
    List.prototype.has = function(part) {

        return this.parts.contains((flags.path ? part : path.basename(part)));
    }
    var ZeroTrigger = function() {
        this.count = 0;
    }
    ZeroTrigger.prototype.add = function() {
        this.count++;
    }
    ZeroTrigger.prototype.remove = function(trigger) {
        this.count--;
        if (this.count < 1) {
            this.count = 0; //reset
            return trigger(); //shit
        }
    }

    if (paths === null || paths === undefined) {
        return new PError("Missing arguments");
    }
    //***************************************************************************************//
    var part_path = path.resolve(paths);
    var part_ext = path.extname(part_path);
    var part_name = path.basename(part_path, part_ext);
    var part_dir = path.dirname(part_path);
    var part_ext = path.extname(part_path);


    var output_dir = (flags.output === "" || flags.output === undefined || flags.output === null) ? null : (path.resolve(flags.output));

    var thatstick = new ZeroTrigger(),
        build_stick = new ZeroTrigger();

    var tocheck = [part_path];
    var check_count = 0;

    var modules = [];
    var mod_loco = {};

    var list = new List();

    if (!fs.existsSync(part_path)) {
        return new PError("Error: Can't find `" + part_path + "`, what's you smoking?");
    }
    if (part_ext.toLowerCase() !== ".v") {
        return new PError("Error: Only `.v` yo! what's you drinking?");
    }
    //***************************************************************************************//

    getModulesfromDir(part_dir, /\.v$/, function(filename) {
        var mod = path.basename(filename);

        if (!modules.contains(mod)) {
            modules.push(mod);
            mod_loco[mod] = filename;
        }
    }, function() {
        _log("Compiling part list for`", part_name, "`from", modules.length, "components...");
        //_log(modules);
        return yoZ_GetNextPart();
    });


    function white_iverson(data) {

        //var rex = new RegExp('[ ,]+');
        var rex = new RegExp(/\s+/g);

        var barrel = data.split(rex); //any white space and tabs
        for (var x = 0; x < barrel.length; x++) {
            var token = barrel[x] + ".v";
            //_log(token, modules.contains(token) && !list.has(mod_loco[token]))
            if (modules.contains(token) && !list.has(token) && !tocheck.contains(mod_loco[token])) {
                //_log(mod_loco[token]);
                tocheck.push(mod_loco[token]);
            }
        }
    }
    //main
    function yoZ_GetNextPart() {

        if (check_count < tocheck.length) {
            var checking = tocheck[check_count++]; //fullpath
            _log("getting", checking);
            list.add(checking);
            var input = fs.createReadStream(checking);
            readLines(input, white_iverson, yoZ_GetNextPart);
            return;
        }
        //list.parts.shift();
        if (tocheck.length === list.parts.length) {
            _log("-----" + part_name, "Part List (" + tocheck.length + "/" + list.parts.length + ")-----");
            _log(list.parts.join(" "));
            return yoZ_SaveThatPart();
        }

        var missing = tocheck.filter(function(x) {
            return !list.has(x)
        });
        return donefailure("ERROR: missing " + missing.length + "/" + tocheck.length + "\n" + missing);
    }

    function yoZ_SaveThatPart( /**Me no conversate with the fake, that part**/ ) {

        if (output_dir === null || output_dir === undefined) return donesuccess(); //no output case
        //saving case
        _log("Saving " + list.parts.length + " components of `" + part_name + "` module to dir: \n" + output_dir);

        mkdirp(output_dir, function(err) {
            if (err) throw new PError(err);
            _save(list.parts, output_dir);
        });
    }

    function donesuccess() {
        var report = {
            name: part_name,
            partlist: list.parts
        }
        return callback(report);
    }

    function donefailure(err) {

        return callback(null, err);
    }

    function _save(_partlist, _output_dir) {
        var d = dm.create();
        d.on('error', function(err) {
            return new PError(err)
        });
        d.run(function() {
            for (var i = 0; i < _partlist.length; i++) {
                build_stick.add();
                _copy(mod_loco[path.basename(_partlist[i])], _output_dir, function() {
                    _log("--------------------------------------------");
                    _log("Finished saving " + list.parts.length + " components of `" + part_name + "` module to dir: \n" + output_dir);
                    _log("--------------------------------------------");
                    return donesuccess();
                });
            }
        });
    }

    function _copy(_part, to_dir, next) {
        fs.createReadStream(path.resolve(_part))
            .pipe(fs.createWriteStream(path.join(to_dir, path.basename(_part))))
            .on('close', function(data) {
                _log("fetched " + _part);
                build_stick.remove(next);
            });
    }

    //http://stackoverflow.com/questions/6831918/node-js-read-a-text-file-into-an-array-each-line-an-item-in-the-array
    function readLines(input, func, endfunc) {
        var remaining = '';

        input.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            var last = 0;
            while (index > -1) {
                var line = remaining.substring(last, index);
                last = index + 1;
                func(line);
                index = remaining.indexOf('\n', last);
            }

            remaining = remaining.substring(last);
        });

        input.on('end', function() {
            if (remaining.length > 0) {
                func(remaining);
            }
            endfunc();
        });
    }

    function getModulesfromDir(startPath, filter, callback, done) {
        //_log('Starting from dir '+startPath+'/');

        if (!fs.existsSync(startPath)) {
            return new PError("no dir " + startPath);
        }
        thatstick.add(); //!important

        var files = fs.readdirSync(startPath);
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {

                getModulesfromDir(filename, filter, callback, done); //recurse
            } else if (filter.test(filename)) callback(filename);
        };
        thatstick.remove(done); //!important
    }
}