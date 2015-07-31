
var EventEmitter = require( 'events' );
var ScrollerAxis = require( './ScrollerAxis' );


var defaultOpts = {
    axes: [ false, true, false ],
	bounds: null // supply a rect object { left: 0, top: 0, right: 500, bottom: 500 }
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
var Scroller = function( pointerEvents, opts ){

    opts = opts || {};
    opts.axes = opts.axes || defaultOpts.axes;
	opts.bounds = opts.bounds || defaultOpts.bounds;

    EventEmitter.call( this );


	this.bounds = opts.bounds;

    this.scrolling = false;
    this.down = false;
    this.enabled = true;

    this.pointerEvents = pointerEvents;
	//this.wheelEvents   = wheelEvents;

	this._onPointer = this.onPointer.bind(this);
	this.pointerEvents.on( 'pointer-up', this._onPointer );
	this.pointerEvents.on( 'pointer-down', this._onPointer );
	this.pointerEvents.on( 'pointer-move', this._onPointer );

    //wheelEvents.on( 'wheel-delta', this.onWheelDelta.bind(this) );

	this.deferredInteractions = [];

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
Scroller.OVERSHOT_MIN = 'overshot-min';
Scroller.OVERSHOT_MAX = 'overshot-max';


Scroller.prototype = Object.create( EventEmitter.prototype );


Scroller.prototype._inBounds = function( position ){

	var b = this.bounds;

	if( b ){
		var x = position[0];
		var y = position[1];
		if( x >= b.left && x<=b.right && y>=b.top && y<=b.bottom ){
			return true;
		}else{
			return false;
		}
	}else{
		return true;
	}
};


Scroller.prototype.onPointer = function( type, position ){

	if( !this.enabled ){
		return;
	}

	switch( type ){

		case 'pointer-up':

			for( var i = 0; i<this.axes.length; i++ ){
				if( this.axes[i] )
					this.axes[i].stop();
			}

			this.down = false;

			break;

		case 'pointer-down':

			if( !this._inBounds( position ) ){
				return;
			}

			for( var i = 0; i<this.axes.length; i++ ){
				if( this.axes[i] )
					this.axes[i].start();
			}

			this.down = true;

			break;

		case 'pointer-move':

			if( !this.down ){
				return;
			}

			for( var i = 0; i<this.axes.length; i++ ){
				if( this.axes[i] )
					this.axes[i].move( this.pointerEvents.position[i] - this.pointerEvents.previous[i] );
			}

			break;

	}

};


Scroller.prototype.onWheelDelta = function( type, delta ){

	if( !this.enabled ){
		return;
	}

	for( var i = 0; i<this.axes.length; i++ ){
		if( this.axes[i] ){
			this.axes[i].wheelDelta( delta[i] );
		}
	}
};


Scroller.prototype.update = function( dt ){

	var changed = false;
	var axis;
	var i;

	// handle deferred interactions.
	if( this.deferredInteractions.length ){

		var shouldEnd = true; // check all axis are going to stop interaction.
		var moveAmount = 0;
		var speed = 0;

		for( i = 0; i<this.axes.length; i++ ){
			axis = this.axes[i];
			if( axis ){
				shouldEnd = shouldEnd && axis.scrollShouldEnd;
				moveAmount = Math.max( Math.abs( axis.moveAmount ), moveAmount );
				speed = Math.max( Math.abs( axis.speed ), speed );
			}
		}

		// trigger interactions. ( this could possibly do this after update? )
		if( shouldEnd ){

			if( moveAmount < 2 && speed < 1 ) {
				for (i = 0; i < this.deferredInteractions.length; i++) {
					this.deferredInteractions[i]();
				}
			}
			this.deferredInteractions.splice(0);
		}
	}

	// handle update
	for( i = 0; i<this.axes.length; i++ ){
		axis = this.axes[i];
		if( axis ){

			changed = changed || axis.update(dt);

			if( changed && axis.overshotMin ){
				this.emit( Scroller.OVERSHOT_MIN, i, axis.overshotNorm );
			}else
			if( changed && axis.overshotMax ){
				this.emit( Scroller.OVERSHOT_MAX, i, axis.overshotNorm );
			}
		}
	}

	if( changed ) {
		this.scrolling = true;
		this.emit(Scroller.SCROLL);
	}else{
		this.scrolling = false;
	}

	return changed;

};


/**
 * Determines whether to trigger a click/tap event instead of scroll event.
 * Useful for when the scrolling items are interactive and you need to determine
 * handling the click based on the scroll speed.
 *
 * @param handler
 */
Scroller.prototype.handleInteraction = function( cb ){
	this.deferredInteractions.push( cb );
};

/**
 *
 * @param x
 * @param y
 * @param z
 * @returns {*}
 */
Scroller.prototype.setSnapSize = function( x, y, z ){

	for( var i = 0; i<this.axes.length; i++ ){
		if( this.axes[i] && !isNaN(arguments[i]) ){
			this.axes[i].snapSize = arguments[i];

		}
	}

	return this;
};


Scroller.prototype.setViewSize = function( x, y, z ){

	for( var i = 0; i<this.axes.length; i++ ){
		if( this.axes[i] && !isNaN(arguments[i]) ){
			this.axes[i].viewSize = arguments[i];

		}
	}

	return this;
};

Scroller.prototype.setMin = function( x, y, z ){

	for( var i = 0; i<this.axes.length; i++ ){
		if( this.axes[i] && !isNaN(arguments[i]) ){
			this.axes[i].min = arguments[i];

		}
	}

	return this;
};


Scroller.prototype.setMax = function( x, y, z ){

	for( var i = 0; i<this.axes.length; i++ ){
		if( this.axes[i] && !isNaN(arguments[i]) ){
			this.axes[i].max = arguments[i];
		}
	}

	return this;
};

Scroller.prototype.setOvershoot = function( value ){

	for( var i = 0; i<this.axes.length; i++ ){
		if( this.axes[i] ){
			this.axes[i].overshoot = value;
		}
	}

	return this;
};


Scroller.prototype.getPosition = function( axis ){
	if( this.axes[axis] ){
		return this.axes[axis].position;
	}else{
		return NaN;
	}
};



Scroller.prototype.dispose = function(){

	this.pointerEvents.off( 'pointer-up', this._onPointer );
	this.pointerEvents.off( 'pointer-down', this._onPointer );
	this.pointerEvents.off( 'pointer-move', this._onPointer );
};





