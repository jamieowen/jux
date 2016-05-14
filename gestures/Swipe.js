
var objectAssign = require( 'object-assign' );
var EventEmitter = require( 'eventemitter3' );

var vec2 = {

	create: require( 'gl-vec2/create' ),
	subtract: require( 'gl-vec2/subtract'),
	normalize: require( 'gl-vec2/normalize' ),
	dot: require( 'gl-vec2/dot'),
	length: require( 'gl-vec2/length' )

};

var UP = [ 0,1 ];
var DOWN = [ 0,-1 ];
var LEFT = [ -1,0 ];
var RIGHT = [ 1,0 ];


var Swipe = function(){

	EventEmitter.call( this );

	this.down = false;

	this.maxDistance = 100;
	this.minDistance = 10;

	this.swipeAccuracy = Math.cos( Math.PI / 8 ); // 22.5 degree accuracy
	this.swipeBegan = false;
	this.swipeDirection = undefined;
	this.swipeDistance = undefined;

	this._start = vec2.create();
	this._position = vec2.create();
	this._helper = vec2.create();

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

		if( Math.abs( this.swipeDistance ) > this.maxDistance ){
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

	console.log( 'SWIPE ... POINTER DOWN' );

};

Swipe.prototype.reset = function(){

	this.swipeBegan = false;
	this.swipeDirection = undefined;
	this.swipeDistance = undefined;

};


Swipe.prototype.pointerMove = function( x, y ){

	if( this.down ){

		this._position[0] = x;
		this._position[1] = y;

		var difference = vec2.subtract( this._helper, this._start, this._position );
		var distance = vec2.length( difference );

		if( !this.swipeBegan && distance > this.minDistance ){

			this.swipeDirection = undefined;

			difference[0] = -difference[0];
			//difference[1] = -difference[1];

			vec2.normalize( difference, difference );

			var dotUp = vec2.dot( difference, UP );
			var dotDown = vec2.dot( difference, DOWN );
			var dotLeft = vec2.dot( difference, LEFT );
			var dotRight = vec2.dot( difference, RIGHT );

			if( dotUp > this.swipeAccuracy ){
				this.swipeDirection = Swipe.DIRECTION.UP;
			}else
			if( dotDown > this.swipeAccuracy ){
				this.swipeDirection = Swipe.DIRECTION.DOWN;
			}else
			if( dotLeft > this.swipeAccuracy ){
				this.swipeDirection = Swipe.DIRECTION.LEFT;
			}else
			if( dotRight > this.swipeAccuracy ){
				this.swipeDirection = Swipe.DIRECTION.RIGHT;
			}

			if( this.swipeDirection ){

				this.swipeBegan = true;
				this.swipeDistance = distance;
				this.emit( Swipe.EVENTS.START, Swipe.EVENTS.START, this.swipeDirection, this.swipeDistance );
			}

		}else{

			if( this.swipeDirection === Swipe.DIRECTION.UP || this.swipeDirection === Swipe.DIRECTION.DOWN ){
				this.swipeDistance = difference[1];
			}else
			if( this.swipeDirection === Swipe.DIRECTION.LEFT || this.swipeDirection === Swipe.DIRECTION.RIGHT ){
				this.swipeDistance = difference[0];
			}

			this.emit( Swipe.EVENTS.UPDATE, Swipe.EVENTS.UPDATE, this.swipeDirection, this.swipeDistance );

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
