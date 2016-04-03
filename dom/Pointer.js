

/**

var pointer = new Pointer();
// down,up,move,( tap,click,press )
// over,out
pointer.on( 'down', function( ev ){

} );

pointer.on( 'up', function(){

} );


var pointer = new Pointer.move();
pointer.onDown.add( function(){

});
pointer.onMove.add( function(){

pointer.onUp.add( function(){

// https://github.com/mattdesl/mouse-event-offset
// https://github.com/hughsk/mouse-position
// https://github.com/mikolalysenko/mouse-event/blob/master/mouse.js
// https://github.com/Jam3/touches

// https://github.com/ftlabs/fastclick



**/

/**
 * Generic pointer utility to attach to all usable
 * mouse and touch events on an element.
 *
 * Pass in options to bind to only a subset of events
 * for specific interactions.  Or use the helper classes accessible
 * via Pointer.( Press | Move | Interact )
 */

var EventEmitter = require( 'eventemitter3' );
var objectAssign = require( 'object-assign' );

var defaultOpts = {
	mode: 'both', // both || touch || mouse
	continuousMove: false
};

var Pointer = function( target, opts ){

	opts = opts || {};
	objectAssign( opts, defaultOpts );

	EventEmitter.call( this );

	this._opts	  = opts;
	this._enabled = false;
	this.target   = target;

	this.onEvent = this.onEvent.bind(this);

	this.enable();

};

Pointer.prototype = Object.create( EventEmitter.prototype );
module.exports = Pointer;

Pointer.EVENT = {
	MOVE: 'move',
	DOWN: 'down',
	UP: 'up',
	TAP: 'tap',
	CLICK: 'click',
	TRIGGER: 'trigger'
};

// Some additional class types to simplify setup.
Pointer.Touch = function PointerTouch( target ){
	Pointer.call( this, target, {
		moveWhenDown:true
	})
};
Pointer.Touch = Object.create( Pointer.prototype );

Pointer.Press = function PointerPress( target ){
	Pointer.call( this, target, {
		moveWhenDown:true
	})
};
Pointer.Press = Object.create( Pointer.prototype );

Pointer.prototype.onEvent = function( ev ){

	switch( ev.type ){

		case 'mousedown':
		case 'touchstart':
			this.emit( Pointer.EVENT.DOWN );
			break;

		case 'mouseup':
		case 'touchend':
			this.emit( Pointer.EVENT.UP );
			break;

		case 'mousemove':
		case 'touchmove':
			this.emit( Pointer.EVENT.MOVE );
			break;

		case 'click':
			this.emit( Pointer.EVENT.CLICK );

	}

};

Pointer.prototype.enable = function(){

	if( !this._enabled ){

		var opts = this._opts;
		var listeners = [];
		if( opts.mode === 'mouse' || opts.mode === 'both' ){
			listeners.push( 'mouseup', 'mousedown', 'mousemove' );
		}
		if( opts.mode === 'touch' || opts.mode === 'both' ){
			listeners.push( 'touchstart', 'touchend', 'touchmove', 'touchcancel' );
		}

		var target = this.target;
		listeners.forEach( function( type ){
			target.addEventListener( type, this.onEvent )
		}.bind(this));

		this._enabled = true;

	}

};

Pointer.prototype.disable = function(){

};

