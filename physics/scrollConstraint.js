

// resolve.
var defaultResolve = function( t ){
    return t;
};

var scrollConstraint = function( min, max, overshoot, current, change, resolve ) {

    if( !resolve )
        resolve = defaultResolve;

    var end = current + change;

    if (end < min) {

        var over = Math.abs( ( end - min ) ) / overshoot;
        return -resolve(over);

    } else if (end > max) {

        var over = Math.abs( ( end - max ) ) / overshoot;
        return resolve(over);

    } else {
        return 0;
    }

};

module.exports = scrollConstraint;