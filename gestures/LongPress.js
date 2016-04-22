
var objectAssign = require( 'object-assign' );
var EventEmitter = require( 'eventemitter3' );

var requestAnimationFrame = require( 'raf' );


var LongPress = function(){

	EventEmitter.call( this );

	this.minDuration = 300;
	this.maxDuration = 1200;

	this.down = false;
	this.pressBegan = false;
	this._start = [];
	this._timerId = NaN;
	this._pressStartTime = NaN;

	this.maxDistance = 10;

};


LongPress.Events = {

	START: 'start',
	END: 'end',
	UPDATE: 'update',
	CANCEL: 'cancel'

};


LongPress.prototype = Object.create( EventEmitter.prototype );

LongPress.prototype.pointerDown = function( x, y ){

	this.down = true;
	this.reset();
	this._start = [ x, y ];

	this._timerId = setTimeout( this._onMinTimePassed, this.minDuration )

};


LongPress.prototype.pointerUp = function( x, y ){

	this.down = false;

	if( this.pressBegan ){


	}

	this.reset();

};


LongPress.prototype.pointerMove = function( x, y ){

	if( this.down ){

		var sx = this._start[0];
		var sy = this._start[1];

		var vx = sx - x;
		var vy = sy - y;

		var distance = Math.sqrt( vx * vx + vy * vy );

	}

};


LongPress.prototype.reset = function(){

	this.pressBegan = false;
	this._pressStartTime = NaN;

	if( !isNaN( this._timerId ) ){
		clearTimeout( this._timerId );
	}

};

LongPress.prototype._onMinTimePassed = function(){

	this.pressBegan = true;
	this._timerId = setTimeout( this._onMaxTimePassed, this.maxDuration - this.minDuration );

	this._pressStartTime =
};


LongPress.prototype.tick = function( time ){


	console.log( time );
	requestAnimationFrame( this.tick );

};


LongPress.prototype._boundPointer = undefined;

LongPress.prototype.bindPointer = function( pointer ){

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


LongPress.prototype.unbindPointer = function(){

	if( this._boundPointer ){

		var pointer = this._boundPointer.pointer;

		pointer.off( 'move', this._boundPointer.onMove );
		pointer.off( 'down', this._boundPointer.onDown );
		pointer.off( 'up', this._boundPointer.onUp );

		this._boundPointer = undefined;

	}

};
