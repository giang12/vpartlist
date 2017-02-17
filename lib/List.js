var path = require('path');

module.exports = List;

function List(fp) {
	this.fp = fp;
    this.parts = [];
}
List.prototype.add = function(part) {
	var ret = false;
    if (!this.has(part)) {
        this.parts.push(this.fp ? part : path.basename(part));
        ret = true;
    }
    return ret;
}
List.prototype.has = function(part) {

    return this.parts.contains(this.fp ? part : path.basename(part));
}
