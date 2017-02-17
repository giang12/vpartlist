var dm = require('domain');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');
var ZeroTrigger = require('./ZeroTrigger');

module.exports = yoZ_SaveThatPart;

function yoZ_SaveThatPart(part_name, list, modules, mod_loco, output_dir, PError, _log, success){

    if (output_dir === null || output_dir === undefined) return success(list, part_name); //no output case
    
    //saving case
    _log("Saving " + list.parts.length + " components of `" + part_name + "` module to dir: \n" + output_dir);
    var build_stick = new ZeroTrigger("build_stick");

    mkdirp(output_dir, function(err) {
        if (err) return new PError(err);
        _save(list.parts, output_dir);
    });

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
                    return success(list, part_name);
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
}
