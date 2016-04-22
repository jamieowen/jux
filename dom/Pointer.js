

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

// QUESTIONS ---
// 1. Move event should probably always be dispatched?

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

/**
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
**/

var getOffset = function( ev, target ){

	if( ev.offsetX && ev.offsetY ){
		return {
			x: ev.offsetX,
			y: ev.offsetY
		};
	}else{

		var bounds = getBoundingClientRect(target);
		return {
			x: ev.clientX - bounds.left,
			y: ev.clientY - bounds.top
		}
	}
};


var topLeft = { left: 0, top: 0 };
var getBoundingClientRect = function( target ){
	if (target === window ||
		target === document ||
		target === document.body) {
		return topLeft;
	} else {
		return target.getBoundingClientRect()
	}
};


Pointer.prototype.onEvent = function( ev ){

	//ev.preventDefault();

	var infoEv = ev;
	if( ev.changedTouches ){
		infoEv = ev.changedTouches[0];
	}

	var offset = getOffset( infoEv,this.target );
	var event = {
		originalEvent: ev,
		clientX: infoEv.clientX,
		clientY: infoEv.clientY,
		offsetX: offset.x,
		offsetY: offset.y
	};

	switch( ev.type ){

		case 'click':
			this.emit( Pointer.EVENT.CLICK,event );
			break;

		case 'mousedown':
		case 'touchstart':

			this.down = true;
			this.emit( Pointer.EVENT.DOWN,event );
			break;

		case 'mouseup':
		case 'touchend':
		case 'touchcancel':
			this.down = false;
			this.emit( Pointer.EVENT.UP,event );
			break;

		case 'mousemove':
		case 'touchmove':

			//if( this.down ){
				this.emit( Pointer.EVENT.MOVE,event );
			//}

			break;


	}

};

function getListeners( opts ){

	var listeners = [];
	if( opts.mode === 'mouse' || opts.mode === 'both' ){
		listeners.push( 'mouseup', 'mousedown', 'mousemove' );
	}
	if( opts.mode === 'touch' || opts.mode === 'both' ){
		listeners.push( 'touchstart', 'touchend', 'touchmove', 'touchcancel' );
	}

	listeners.push( 'click' );
	console.log( 'ADD' );
	return listeners;

}

Pointer.prototype.enable = function(){

	if( !this._enabled ){

		var listeners = getListeners( this._opts );
		var target = this.target;
		listeners.forEach( function( type ){
			target.addEventListener( type, this.onEvent )
		}.bind(this));

		this._enabled = true;

	}

};


Pointer.prototype.disable = function(){

	if( this._enabled ){

		var listeners = getListeners( this._opts );
		var target = this.target;
		listeners.forEach( function( type ){
			target.removeEventListener( type, this.onEvent )
		}.bind(this));

		this._enabled = false;

	}

};

