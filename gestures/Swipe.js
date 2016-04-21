
var objectAssign = require( 'object-assign' );
var EventEmitter = require( 'eventemitter3' );

var Swipe = function( direction, opts ){

	if( typeof direction === 'string' ){
		this.direction = [ direction ]
	}else{
		this.direction = direction; // assume array
	}

	EventEmitter.call( this );

	this.direction = direction;
	this.down = false;

	this.minDistanceX = this.minDistanceY = 10;
	this.maxDistanceX = this.maxDistanceY = 100;

	//this.minSpeed = 1;
	//this.maxSpeed = 5;

	this.swipeBegan = false;
	this.swipeDirection = undefined;
	this.swipeDistance = undefined;

	this._start = [];

};

Swipe.prototype = Object.create( EventEmitter.prototype );

Swipe.DIRECTION = {

	LEFT: 'left',
	RIGHT: 'right',
	UP: 'up',
	DOWN: 'down'

};

Swipe.EVENTS = {

	START: 'start',
	END: 'end',
	UPDATE: 'update',
	CANCEL: 'cancel'

};

module.exports = Swipe;


Swipe.prototype.pointerUp = function( x, y ){

	this.down = false;

	if( this.swipeBegan ){

		var distance = this.maxDistanceX;
		if( this.swipeDirection === Swipe.DIRECTION.UP || this.swipeDirection === Swipe.DIRECTION.DOWN ){
			distance = this.maxDistanceY;
		}

		if( Math.abs( this.swipeDistance ) > distance ){
			this.emit( Swipe.EVENTS.END, Swipe.EVENTS.END, this.swipeDirection, this.swipeDistance );
		}else{
			this.emit( Swipe.EVENTS.CANCEL, Swipe.EVENTS.CANCEL, this.swipeDirection, this.swipeDistance );
		}

	}

	this.reset();

};


Swipe.prototype.pointerDown = function( x, y ){

	this.down = true;
	this.reset();
	this._start = [ x, y ];

};

Swipe.prototype.reset = function(){

	this.swipeBegan = false;
	this.swipeDirection = undefined;
	this.swipeDistance = undefined;

};


var calcSwipeDistance = function( distance, minDistance ){

	// TODO: Prevent Distance inverting itself depending on Direction.

	var dir = Math.abs( distance ) / distance;
	return distance - ( minDistance*dir );

};

Swipe.prototype.pointerMove = function( x, y ){

	if( this.down ){

		var sx = this._start[0];
		var sy = this._start[1];

		var vx = sx - x;
		var vy = sy - y;

		// DO BASIC HERE FIRST..
		// COULD HANDLE ANGLE BETWEEN, ETC..
		//var angle = Math.atan2( sy - y, sx - x );
		//console.log('DEGREES  = ', angle, ( 180 / Math.PI ) * angle );

		//var distance = Math.sqrt( vx * vx + vy * vy );

		if( !this.swipeBegan ){

			this.swipeDirection = undefined;

			if( vx > this.minDistanceX ){
				this.swipeDistance = calcSwipeDistance( vx, this.minDistanceX );
				this.swipeDirection = Swipe.DIRECTION.LEFT;
			}else
			if( vx < -this.minDistanceX ){
				this.swipeDistance = calcSwipeDistance( vx, this.minDistanceX );
				this.swipeDirection = Swipe.DIRECTION.RIGHT;
			}else
			if( vy > this.minDistanceY ){

				this.swipeDistance = calcSwipeDistance( vy, this.minDistanceY );
				this.swipeDirection = Swipe.DIRECTION.UP;
			}else
			if( vy < -this.minDistanceY ){
				this.swipeDistance = calcSwipeDistance( vy, this.minDistanceY );
				this.swipeDirection = Swipe.DIRECTION.DOWN;
			}

			if( this.swipeDirection ){

				this.emit( Swipe.EVENTS.START, Swipe.EVENTS.START, this.swipeDirection, this.swipeDistance );
				this.swipeBegan = true;

			}
			/**
			// calculate
			if( Math.abs(distance) > this.distanceMin ){

				if( vx > 0 ){
					this.swipeDirection = Swipe.DIRECTION.LEFT;
				}else
				if( vx < 0 ){
					this.swipeDirection = Swipe.DIRECTION.RIGHT;
				}else
				if( vy > 0 ){
					this.swipeDirection = Swipe.DIRECTION.UP;
				}else
				if( vy < 0 ){
					this.swipeDirection = Swipe.DIRECTION.DOWN;
				}

				this.swipeDistance = calcSwipeDistance( vx, this.distanceMin );
				this.emit( Swipe.EVENTS.START, Swipe.EVENTS.START, this.swipeDirection, this.swipeDistance );
				this.swipeBegan = true;

			}**/

		}else{

			switch( this.swipeDirection ){

				case Swipe.DIRECTION.LEFT :
				case Swipe.DIRECTION.RIGHT :
					this.swipeDistance = calcSwipeDistance( vx, this.minDistanceX );
					this.emit( Swipe.EVENTS.UPDATE, Swipe.EVENTS.UPDATE, this.swipeDirection, this.swipeDistance );
					break;

				case Swipe.DIRECTION.UP:
				case Swipe.DIRECTION.DOWN :
					this.swipeDistance = calcSwipeDistance( vy, this.minDistanceY );
					this.emit( Swipe.EVENTS.UPDATE, Swipe.EVENTS.UPDATE, this.swipeDirection, this.swipeDistance );
					break;

			}

		}


	}
};


Swipe.prototype._boundPointer = undefined;


Swipe.prototype.bindPointer = function( pointer ){

	if( this._boundPointer ){
		return;
	}

	var swipe = this;
	this._boundPointer = {
		pointer: pointer,
		onMove: function( ev ){
			this.pointerMove( ev.offsetX, ev.offsetY );
		}.bind(swipe),
		onDown: function( ev ){
			this.pointerDown( ev.offsetX, ev.offsetY );
		}.bind(swipe),
		onUp: function( ev ){
			this.pointerUp( ev.offsetX, ev.offsetY );
		}.bind(swipe)
	};

	// need to look at referencing constants for event types
	pointer.on( 'move', this._boundPointer.onMove );
	pointer.on( 'down', this._boundPointer.onDown );
	pointer.on( 'up', this._boundPointer.onUp );

};


Swipe.prototype.unbindPointer = function(){

	if( this._boundPointer ){

		var pointer = this._boundPointer.pointer;

		pointer.off( 'move', this._boundPointer.onMove );
		pointer.off( 'down', this._boundPointer.onDown );
		pointer.off( 'up', this._boundPointer.onUp );

		this._boundPointer = undefined;

	}

};
