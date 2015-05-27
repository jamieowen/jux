
var Ease = function(){
    this.set.apply( this, arguments );
};

var create = function( current, to, ease, speed, limit ){
    var ease = new Ease( current, to, ease, speed, limit );
    return ease;

};

create.Ease = Ease;

module.exports = create;

var defaults = {
    current: 0,
    to: 0,
    ease: 0.5,
    speed: 0,
    limit: 0.1
};

Ease.prototype = {

    set: function( current, to, ease, speed, limit ){

        this.current = current || defaults.current;
        this.to = to || defaults.to;
        this.ease = ease || defaults.ease;
        this.speed = speed || defaults.speed;
        this.limit = limit || defaults.limit;
        this.__done = this.current === this.to;
    },

    get: function(){
        return this.current;
    },

    update: function(){

        var diff = this.to - this.current;
        var speed = this.speed + ( diff * this.ease );
        var updated = this.current + speed;

        if( Math.abs( this.to - updated ) <= this.limit ){
            this.current = this.to;
            this.__done = true;
        }else{
            this.current = updated;
            this.__done = false;
        }

        return this.current;
    },

    done: function(){
        return this.__done;
    }
};