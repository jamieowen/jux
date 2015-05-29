
var ease = require( 'jux/physics/ease' );

var ScrollerAxis = function(){

    this.snapSize = 0;
    this.position = 0;

    this.min = 0;
    this.max = 0;
    this.viewSize = 0;

    this.speed = 0;
    this.friction = 0.9655;

    this.scroll = false;
    this.scrollShouldEnd = false;
    this.scrollStart = 0;

    this.overshoot = 100;

    this.moveAmount = 0;
    this.moveLast = 0;
};


module.exports = ScrollerAxis;


ScrollerAxis.prototype = {

    start: function(){

        if( !this.scroll ){
            this.scrollStart = this.position;
            this.moveAmount = 0;
            this.moveLast = 0;
            this.scroll = true;
        }
    },

    stop: function(){

        if( this.scroll ){
            this.scrollShouldEnd = true;
        }
    },

    move: function( offset ){

        if( this.scroll ){
            this.moveAmount += offset;
            this.moveLast = offset;
        }
    },

    wheelDelta: function( delta ){

    },

    update: function(dt){

        var overshoot = this.viewSize * 0.25;

        if( this.scroll ){

            this.position = this.scrollStart + this.moveAmount;
            this.snapEase = null;

            if( this.scrollShouldEnd ){
                this.scroll = false;
                this.scrollShouldEnd = false;
                // add the 'throw' speed increase.
                this.speed += this.moveLast; // TODO : This should compare with previous frame
            }

        }else{

            var pastMin = this.position > this.min;
            var contentHeight = ( this.max - this.min ) - this.viewSize;
            var pastMax = this.position < -contentHeight;

            if( !pastMin && !pastMax ){
                this.speed *= this.friction; // apply friction as usual.
            }else
            if( pastMin ){
                var diff = Math.abs( this.min - this.position );
                var diffNorm = 1 - Math.min( diff / overshoot, 1 );
                this.speed *= this.friction * ( 0.9955 * diffNorm  );
            }else
            if( pastMax ){
                var diff = Math.abs( -contentHeight - this.position );
                var diffNorm = 1 - Math.min( diff / overshoot, 1 );
                this.speed *= this.friction * ( 0.9955 * diffNorm  );
            }

            this.position += this.speed;

            var canRest = Math.abs(this.speed) < 0.25;

            if( ( pastMin || pastMax ) && canRest && !this.snapEase ) {

                // check whether we are applying a snap and start to apply it.
                console.log( 'START SNAP' );
                this.speed = 0;
                if( pastMin ){
                    this.snapEase = ease( this.position, this.min, 0.1, this.speed );
                }else
                if( pastMax ){
                    this.snapEase = ease( this.position, -contentHeight, 0.1, this.speed );
                }

            }else
            if( this.snapEase ){
                this.position = this.snapEase.update();

                if( this.snapEase.done() ){
                    console.log( 'SNAP DONE' );
                    this.snapEase = null;
                    return false;
                }

            }else
            if( canRest ){
                return false;
            }
        }

        return true;
    },

    __constrain: function( min, max, current, change ){

        var end = current + change;
        if( end < min ){
            return 0;
        }else
        if( end > max ){
            return 0;
        }else{
            return 1;
        }
    }


};