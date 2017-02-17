var fs = require('fs');
var path = require('path');
var ZeroTrigger = require('./ZeroTrigger');

module.exports = get_repos;

function get_repos(repos, _log, done) {

    _log("Retrieving components from", repos.length, "repos:\n", repos);
    var hotdamn = new ZeroTrigger("kool_john");
    var modules = [];
    var mod_loco = {};
    for (var i = 0; i < repos.length; i++) {
        hotdamn.add();
        ykool_john_index(repos[i], function __whendone(d, p) {
            _log("got", p.length, "part from", d, p.join(' '));
            hotdamn.remove(function() {
                return done(modules, mod_loco);
            });
        });
    };

    function ykool_john_index(s, d) {
        var p = [];
        getModulesfromDir(new ZeroTrigger(s), s, /\.v$/, function __forach(filename) {
            var mod = path.basename(filename);
            if (!modules.contains(mod)) {
                p.push(mod)
                modules.push(mod);
                mod_loco[mod] = filename;
            }
        }, function(e) {
            return _log(e);
        }, function() {
            return d(s, p);
        });
    }

    function getModulesfromDir(thatstick, startPath, filter, callback, eacherrorHandler, done) {
        //_log('Starting from dir '+startPath+'/');
        thatstick.add(); //!important

        fs.stat(startPath, function(err, stats) {
            if (err) {
                // Directory doesn't exist or something.
                eacherrorHandler("cannot find dir " + startPath);
                return thatstick.remove(done); //!important
            }
            if (!stats.isDirectory()) {
                // This isn't a directory!
                eacherrorHandler(startPath + ' is not a directory!');
                return thatstick.remove(done); //!important
            }
            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {

                    getModulesfromDir(thatstick, filename, filter, callback, eacherrorHandler, done); //recurse
                } else if (filter.test(filename)) callback(filename);
            };
            return thatstick.remove(done); //!important
        });
    }

}
