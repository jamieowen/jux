
var pull = require( 'jux/physics/pull' );

// Standard way of defining a physics based animation method.
// wrap in a function to specify different

var defaultOvershootMethod = function( begin, end, speed ){
    var force = 3;
    return pull( begin, end, speed, force );
};

/**
 * ScrollerAxis
 *
 * @constructor
 */
var ScrollerAxis = function(){

    this.snapSize = 0;
    this.position = 0;

    this.min = 0;
    this.max = 0;
    this.viewSize = 0;

    this.speed = 0;
    this.friction = 0.9655;

    this.scrolling = false;
    this.scrollShouldEnd = false;
    this.scrollStart = 0;

    this.overshoot = 0.25;
    this.overshootMethod = defaultOvershootMethod;
    this.overshotMin = false;
    this.overshotMax = false;
    this.overshotNorm = 0;

    this.moveAmount = 0;
    this.moveLast = 0;
};

var create = function(){
    var axis = new ScrollerAxis();
    return axis;
};

create.ScrollerAxis = ScrollerAxis;


module.exports = ScrollerAxis; // leave as new() for now.


ScrollerAxis.prototype = {

    start: function(){

        if( !this.scrolling ){
            this.scrollStart = this.position;
            this.moveAmount = 0;
            this.moveLast = 0;
            this.scrolling = true;
        }
    },

    stop: function(){

        if( this.scrolling ){
            this.scrollShouldEnd = true;
        }
    },

    move: function( offset ){

        if( this.scrolling ){
            this.moveAmount += offset;
            this.moveLast = offset;
        }
    },

    wheelDelta: function( delta ){
        if( !this.scrolling ){
            var contentHeight = ( this.max - this.min ) - this.viewSize;
            var overshotMin = this.position > this.min;
            var overshotMax = this.position < -contentHeight;

            if( !overshotMin && !overshotMax ){

                this.snapEase = null; // prevent
                delta = -delta;
                this.speed += delta * 0.03;
            }

        }
    },

    update: function(dt){
        
        if( this.scrolling ){
            var pos = this.scrollStart + this.moveAmount;
        }else{
            pos = this.position;
        }
        
        var contentHeight = ( this.max - this.min ) - this.viewSize;
        var overshoot = this.viewSize * this.overshoot;
        this.overshotMin = pos > this.min;
        this.overshotMax = pos < -contentHeight;

        if( this.overshotMin ){
            this.overshotNorm = Math.abs( this.min - pos ) / overshoot; // 0 - 1.0, 2.5, etc
        }else
        if( this.overshotMax ){
            this.overshotNorm = Math.abs( -contentHeight - pos ) / overshoot;
        }

        this.speed *= this.friction;

        var maxSpeed = 20;
        if( Math.abs(this.speed) > maxSpeed ){
            this.speed = maxSpeed * ( this.speed / Math.abs(this.speed) );
        }

        if( this.scrolling ){

            var overshotDrag = this.overshotNorm / ( 1 / this.overshoot );
            //console.log( this.position, this.scrollStart, this.moveLast, overshotMin, overshotMax, this.scrollShouldEnd );
            if( this.overshotMin ){
                this.position = this.min + ( overshoot * overshotDrag );
            }else
            if( this.overshotMax ){
                this.position = -contentHeight - ( overshoot * overshotDrag );
            }else{
                this.position = pos;
            }
            this.snapEase = null;
            this.speed = 0;

            if( this.scrollShouldEnd ){
                this.scrolling = false;
                this.scrollShouldEnd = false;
                // add the 'throw' speed increase.

                if( !this.overshotMin && !this.overshotMax ) {
                    this.speed += this.moveLast; // TODO : This should compare with previous frame
                }
            }

        }else{

            this.position += this.speed;

            // check if we have slowed enough to stop updating and come to a halt.
            var canRest = Math.abs(this.speed) < 0.25;

            if( ( this.overshotMin || this.overshotMax ) && !this.snapEase ) {

                if( this.overshotMin ){
                    this.snapEase = this.overshootMethod( this.position, this.min, this.speed );
                }else
                if( this.overshotMax ){
                    this.snapEase = this.overshootMethod( this.position, -contentHeight, this.speed );
                }

            }else
            if( this.snapEase ){

                if( this.overshotNorm ){
                    this.snapEase.factor = this.overshotNorm;
                }else{
                    this.snapEase.factor = 1;
                }

                this.position = this.snapEase.update();

                if( this.snapEase.done() ){

                    this.speed = this.snapEase.speed;
                    this.snapEase = null;
                    return true;
                }

            }else
            if( canRest ){
                this.speed = 0;
                return false;
            }
        }

        return true;
    }

};