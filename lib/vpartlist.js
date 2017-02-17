var fs = require('fs');
var path = require('path');
var _ = require('lodash');

require('events').EventEmitter.defaultMaxListeners = 0;

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
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

/**
 * Build a part list for a component
 * @param  String   component fullpath/to/module.v
 * @param  Object   opts      {
 *                                "repositories": undefined,
 *                                 "output": undefined, //NOPE
 *                                 "path": false,
 *                                 "verbose": false
 *                             }
 * @param  function callback  (result, err){
 *     @err = {name: PError, message:,stack:,}
 *     @result = {name:, partlist:,}
 *   }
 */
function vPartList(component, opts, callback, undefined) {

    var flags = _.merge({}, {
        "repositories": undefined,
        "output": undefined, //NOPE
        "path": false,
        "verbose": false
    }, opts);

    var _log = flags.verbose ? console.log : (function() {});

    var PError = function(err) {
        _log(err);

        this.name = "PError";
        this.message = err;
        typeof Error.captureStackTrace === 'function' ?
            Error.captureStackTrace(this, this.constructor) :
            this.stack = (new Error(message)).stack;;
        return donefailure(this); //bubble up

    };

    if (component === null || component === undefined) {
        return new PError("Missing arguments");
    }

    //***************************************************************************************//
    var part_path = path.resolve(component);
    var part_ext = path.extname(part_path);
    var part_name = path.basename(part_path, part_ext);
    var part_dir = path.dirname(part_path);

    var repos = (flags.repositories === "" || flags.repositories === undefined || flags.repositories === null) ?
        [part_dir] :
        (typeof flags.repositories === 'string' ? [flags.repositories] : flags.repositories).map(function(r) {
            return path.resolve(r);
        });

    var output_dir = (flags.output === "" || flags.output === undefined || flags.output === null) ?
        null :
        (path.resolve(flags.output));

    if (!fs.existsSync(part_path)) {
        return new PError("Can't find `" + part_path + "`, what's you smoking?");
    }
    if (part_ext.toLowerCase() !== ".v") {
        return new PError("Only `.v` yo! what's you drinking?");
    }
    var get_repos = require('./get_repos');
    var yoZ_GetThatPart = require('./yoZ_GetThatPart');
    var yoZ_SaveThatPart = require(('./yoZ_SaveThatPart'));
    //***************************************************************************************//
    get_repos(repos, _log,
        function _get_repos_finish(modules, mods_locos) {
            yoZ_GetThatPart(flags.path, part_name, part_path, modules, mods_locos, PError, _log,
                function _finish_get_part(list) {
                    yoZ_SaveThatPart(part_name, list, modules, mods_locos, output_dir, PError, _log, donesuccess);
                });
        });

    function donesuccess(list, part_name) {
        var report = {
            name: part_name,
            partlist: list.parts
        }
        return callback(report);
    }

    function donefailure(err) {

        return callback(null, err);
    }
}
