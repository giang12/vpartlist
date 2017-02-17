var fs = require('fs');
var List = require('./List');

module.exports = yoZ_GetThatPart;
/**Me no conversate with the fake, that part**/
function yoZ_GetThatPart(fullpath, part_name, part_path, modules, mod_loco, PError, _log, success) {
    _log("Compiling module", part_name, "from", modules.length, "available components");
    var tocheck = [part_path];
    var check_count = 0;
    var list = new List(fullpath);

    return yoZ_GetNextPart();

    function yoZ_GetNextPart() {

        if (modules.length < 1) {

            return new PError("no repos avail, what's you tweaking?");
        }

        if (check_count < tocheck.length) {
            var checking = tocheck[check_count++]; //fullpath
            _log("getting", checking);
            list.add(checking);
            var input = fs.createReadStream(checking);
            readLines(input, white_iverson, yoZ_GetNextPart);
            return;
        }
        //list.parts.shift();
        if (tocheck.length !== list.parts.length) {
            var missing = tocheck.filter(function(x) {
                return !list.has(x)
            });
            return PError("ERROR: missing " + missing.length + "/" + tocheck.length + "\n" + missing);
        }

        _log("-----" + part_name, "Part List (" + tocheck.length + "/" + list.parts.length + ")-----");
        _log(list.parts.join(" "));

        return success(list, part_name);

    }

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
}
