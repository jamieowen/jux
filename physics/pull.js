/**
 *
 * Basic 'pull' physics to pull a value towards a given point.
 * Once the value reaches the point it stops.
 *
 * The first 3 arguments are a standard interface with these types
 * of animation objects.
 *
 * The factor property must also be present. @see ScrollerAxis
 *
 * @constructor
 */
var Pull = function( begin, end, speed, force, factor ){
    this.set( begin, end, speed, force, factor )
};

var create = function( begin, end, speed, force, factor ){
    var pull= new Pull( begin, end, speed, force, factor );
    return pull;

};

create.Pull = Pull;

module.exports = create;

var defaults = {
    begin: 0,
    end: 0,
    speed: 0,
    force: 3,
    factor: 1
};

Pull.prototype = {

    // begin, end, speed,
    set: function( begin, end, speed, force, factor ){

        this.begin = begin || defaults.begin;
        this.end = end || defaults.end;
        this.now = begin;
        var diff = this.end - this.now;
        this.dir = Math.abs(diff)/diff;

        // current speed
        this.speed = speed || defaults.speed;

        this.force = force || defaults.force;
        this.factor = factor || defaults.factor;

        this.__done = false;
    },

    get: function(){
        return this.now;
    },

    update: function(){

        this.speed += this.dir * this.force * this.factor;

        var then = this.now;
        this.now += this.speed;

        // (x-a)*(x-b)<=0;
        if( (this.end-then)*(this.end-this.now)<=0 ){
            this.speed  = 0;
            this.force = 0;
            this.now = this.end;

            this.__done = true;
        }

        return this.now;
    },

    done: function(){
        return this.__done;
    }
};