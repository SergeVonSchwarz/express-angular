module.exports.compareTotal = function(a, b) {
    if (a.total > b.total) {
        return -1;
    } else if (a.total < b.total) {
        return 1;
    }
}