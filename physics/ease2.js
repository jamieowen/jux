
/**
 * Mini physics based animations.
 */

var defaults = {
    current: 0,
    to: 0,
    ease: 0.5,
    speed: 0,
    happy: 0.1
};


var to = function( current, to, ease, speed, happy ){

    var instance = [
        current === undefined ? defaults.current : current, // 0 current
        to === undefined ? defaults.to : to,                // 1 to
        ease === undefined ? defaults.ease : ease,          // 2 ease
        speed === undefined ? defaults.speed : speed,       // 3 speed
        happy === undefined ? defaults.happy : happy,       // 4 happy
        false                                               // 5 done
    ];

    return instance;
};


var update = function( inst ){

    // diff = to - current
    var diff = inst[1] - inst[0];

     console.log( 'DIFF :', diff, inst[4] );
    // diff < happy?
    if( Math.abs(diff) <= inst[4] ){
        inst[0] = inst[1]; // current = to
        inst[2] = 0; // speed = 0
        inst[5] = true; // done = true

    }else{
        // speed = diff * ease
        inst[3] = diff * inst[2];
        // current += speed
        inst[0] += inst[3];
    }

    return inst[0];
};


var done = function( inst ){
    return inst[5];
};


module.exports = {
    to: to,
    update: update,
    done: done
};

