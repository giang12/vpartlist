module.exports = ZeroTrigger;

function ZeroTrigger(name) {
    this.name = name;
    this.count = 0;
}
ZeroTrigger.prototype.add = function() {
    this.count++;
}
ZeroTrigger.prototype.remove = function(trigger) {
    this.count--;
    if (this.count < 1) {
        this.count = 0;
        return trigger();
    }
}
