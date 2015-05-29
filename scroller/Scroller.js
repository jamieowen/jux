
var inherit      = require( 'inherits' );
var mixes        = require( 'mixes' );

var EventEmitter = require( 'events' );
var ScrollerAxis = require( './ScrollerAxis' );


var defaultOpts = {
    axes: [ false, true, false ]
};

/**
 *
 * Scroller Class for jux.
 *
 * @param pointerEvents
 * @param wheelEvents
 * @param opts
 * @constructor
 *
 */
var Scroller = function( pointerEvents, wheelEvents, opts ){

    opts = opts || {};
    opts.axes = opts.axes || defaultOpts.axes;

    EventEmitter.call( this );

    this.pointerEvents = pointerEvents;
    this.wheelEvents   = wheelEvents;

    pointerEvents.on( 'pointer-up', this.onPointer.bind(this) );
    pointerEvents.on( 'pointer-down', this.onPointer.bind(this) );
    pointerEvents.on( 'pointer-move', this.onPointer.bind(this) );

    wheelEvents.on( 'wheel-delta', this.onWheelDelta.bind(this) );

    this.axes = [];
    for( var i = 0; i<3; i++ ){
        if( opts.axes[i] ){
            this.axes[i] = new ScrollerAxis();
        }else{
            this.axes[i] = false;
        }
    }
};

module.exports = Scroller;

/**
 * @enum
 */
Scroller.SCROLL = 'scroll';


inherit( Scroller, EventEmitter );
mixes( Scroller, {

    onPointer: function( type, position ){

        switch( type ){

            case 'pointer-up':

                for( var i = 0; i<this.axes.length; i++ ){
                    if( this.axes[i] )
                        this.axes[i].stop();
                }

                break;

            case 'pointer-down':

                for( var i = 0; i<this.axes.length; i++ ){
                    if( this.axes[i] )
                        this.axes[i].start();
                }

                break;

            case 'pointer-move':

                for( var i = 0; i<this.axes.length; i++ ){
                    if( this.axes[i] )
                        this.axes[i].move( this.pointerEvents.position[i] - this.pointerEvents.previous[i] );
                }

                break;

        }

    },

    onWheelDelta: function( type, delta ){

        //if( !this.pointerEvents.down ){
        //    vec3.scale( delta, delta, -1.0 );
        //    vec3.add( this.velocity, this.velocity, delta );
        //}
    },

    update: function( dt ){

        var changed = false;

        for( var i = 0; i<this.axes.length; i++ ){
            if( this.axes[i] ){
                changed = changed || this.axes[i].update(dt);
            }
        }

        if( changed ) {
            this.emit(Scroller.SCROLL);
        }

    },

    /**
     *
     * @param x
     * @param y
     * @param z
     * @returns {*}
     */
    setSnapSize: function( x, y, z ){

        for( var i = 0; i<this.axes.length; i++ ){
            if( this.axes[i] && !isNaN(arguments[i]) ){
                this.axes[i].snapSize = arguments[i];

            }
        }

        return this;
    },

    setViewSize: function( x, y, z ){

        for( var i = 0; i<this.axes.length; i++ ){
            if( this.axes[i] && !isNaN(arguments[i]) ){
                this.axes[i].viewSize = arguments[i];

            }
        }

        return this;
    },

    setMin: function( x, y, z ){

        for( var i = 0; i<this.axes.length; i++ ){
            if( this.axes[i] && !isNaN(arguments[i]) ){
                this.axes[i].min = arguments[i];

            }
        }

        return this;
    },

    setMax: function( x, y, z ){

        for( var i = 0; i<this.axes.length; i++ ){
            if( this.axes[i] && !isNaN(arguments[i]) ){
                this.axes[i].max = arguments[i];

            }
        }

        return this;
    },

    getPosition: function( axis ){
        if( this.axes[axis] ){
            return this.axes[axis].position;
        }else{
            return NaN;
        }
    },

    next: function(){
        console.log( 'next' );
    },

    previous: function(){
        console.log( 'previous' );
    },

    dispose: function(){
        this.pointerEvents.removeListener( 'pointer-down', this.onPointer );
        this.pointerEvents.removeListener( 'pointer-down', this.onPointer );
    }
});





