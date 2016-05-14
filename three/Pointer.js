
var Pointer = require( '@jux/dom/Pointer' );
var EventEmitter = require( 'eventemitter3' );

var helperVec = {
	x: 0,
	y: 0
};

var toScreenSpace = function( x,y, width, height ){

	helperVec.x = ( x / width ) * 2 - 1;
	helperVec.y = - ( y / height ) * 2 + 1;
	return helperVec;

};

var createEvent = function( obj, planeWidth, planeHeight ){

	var x = obj.uv.x * planeWidth;
	var y = -obj.uv.y * planeHeight;

	var ev = {
		originalEvent: obj,
		clientX: x, // same as offset.
		clientY: y,
		offsetX: x,
		offsetY: x
	};

	return ev;

};

var ThreePointer = function( domElement, camera, raycaster, interactionPlane ){

	EventEmitter.call( this );

	this.domElement = domElement;
	this.pointer = new Pointer( this.domElement );

	this.camera = camera;
	this.interactionPlane = interactionPlane;
	this.raycaster = raycaster;

	this.planeWidth = interactionPlane.geometry.parameters.width;
	this.planeHeight = interactionPlane.geometry.parameters.height;

	this.down = false;
	this.alwaysMove = false;
	this.previousEvent = null;

	this.onUp = this.onUp.bind(this);
	this.onDown = this.onDown.bind(this);
	this.onMove = this.onMove.bind(this);
	this.pointer.on( Pointer.EVENT.DOWN, this.onDown );
	this.pointer.on( Pointer.EVENT.UP, this.onUp );
	this.pointer.on( Pointer.EVENT.MOVE, this.onMove );

};


ThreePointer.prototype = Object.create( EventEmitter.prototype );
module.exports = ThreePointer;


ThreePointer.EVENT = {

	DOWN: 'down',
	UP: 'up',
	MOVE: 'move'

};

var calculateInteraction = function( ev, p ){

	var rect = p.domElement.getBoundingClientRect();
	var screen = toScreenSpace( ev.offsetX, ev.offsetY, rect.width,rect.height  );

	p.raycaster.setFromCamera( screen, p.camera );
	var intersects = p.raycaster.intersectObject( p.interactionPlane );

	if( intersects.length ){
		var obj = intersects[0];
		var ev = createEvent( obj, p.planeWidth, p.planeHeight );
		return ev;
	}else{
		return null;
	}

};


ThreePointer.prototype.onDown = function( ev ){

	if( this.down ){
		return;
	}

	var result = calculateInteraction( ev, this );

	if( result ){
		this.down = true;
		this.previousEvent = result;
		this.emit( ThreePointer.EVENT.DOWN, result );
	}

};

ThreePointer.prototype.onUp = function( ev ){

	var result = calculateInteraction( ev, this );

	if( result ){
		this.down = false;
		this.emit( ThreePointer.EVENT.UP, result );
	}else{
		this.emit( ThreePointer.EVENT.UP, this.previousEvent );
	}

};

ThreePointer.prototype.onMove = function( ev ){

	if( !this.alwaysMove && !this.down ){
		return;
	}

	var result = calculateInteraction( ev, this );

	if( result ){
		this.previousEvent = result;
		this.emit( ThreePointer.EVENT.MOVE, result );
	}

};