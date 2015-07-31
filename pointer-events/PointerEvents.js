
var EventEmitter = require( 'events' );

// Standardized PointerEvents for DomElements.

var PointerEvents = function( domElement ) {

    EventEmitter.call( this );
    
    this.domElement = domElement;

    this.start    = [ 0,0 ];
    this.position = [ 0,0 ]; // use vec3 as standard.
    this.previous = [ 0,0 ];

    this.down       = false;

    this.domElement.addEventListener( 'mousemove', this.onPointer.bind(this) );
    this.domElement.addEventListener( 'mouseup', this.onPointer.bind(this) );
    this.domElement.addEventListener( 'mousedown', this.onPointer.bind(this) );
	this.domElement.addEventListener( 'touchstart', this.onPointer.bind(this) );
	this.domElement.addEventListener( 'touchend', this.onPointer.bind(this) );
	this.domElement.addEventListener( 'touchmove', this.onPointer.bind(this) );
	

	if( typeof window !== 'undefined' && window !== this.domElement ){
		window.addEventListener( 'mouseup', this.onPointer.bind(this) );
	}

};

PointerEvents.POINTER_DOWN  = 'pointer-down';
PointerEvents.POINTER_UP    = 'pointer-up';
PointerEvents.POINTER_MOVE  = 'pointer-move';

module.exports = PointerEvents;
PointerEvents.prototype = Object.create( EventEmitter.prototype );

PointerEvents.prototype.onPointer = function( event ){

    event.preventDefault();

	var x,y;

	if( event.touches ){
		x = event.touches[0].clientX;
		y = event.touches[0].clientY;
	}else{
		x = event.clientX;
		y = event.clientY;
	}

    switch( event.type ){
		case 'touchmove' :
        case 'mousemove' :

            this._setPosition( x,y );
            this.emit( PointerEvents.POINTER_MOVE, PointerEvents.POINTER_MOVE, this.position, this.previous, event );

            break;

		case 'touchend' :
        case 'mouseup':

            if( this.down ){
                this.down = false;
                this.emit( PointerEvents.POINTER_UP, PointerEvents.POINTER_UP, this.position, this.previous, event );

                // clear start
                this.start[0] = 0;
                this.start[1] = 0;
            }

            break;

		case 'touchstart' :
        case 'mousedown':

            this._setPosition( x, y );

            if( !this.down ){
                this.down = true;
                this.start[0] = this.position[0];
                this.start[1] = this.position[1];

                this.emit( PointerEvents.POINTER_DOWN, PointerEvents.POINTER_DOWN, this.position, this.previous, event );
            }

            break;
    }
};

PointerEvents.prototype._setPosition = function( x, y ){

    this.previous[0] = this.position[0];
    this.previous[1] = this.position[1];

    this.position[0] = x;
    this.position[1] = y;
};

PointerEvents.prototype.dispose = function(){

    this.domElement.removeEventListener( 'mousemove', this.onPointer);
    this.domElement.removeEventListener( 'mouseup', this.onPointer);
    this.domElement.removeEventListener( 'mousedown', this.onPointer);
	this.domElement.removeEventListener( 'touchstart', this.onPointer.bind(this) );
	this.domElement.removeEventListener( 'touchend', this.onPointer.bind(this) );
	this.domElement.removeEventListener( 'touchmove', this.onPointer.bind(this) );

	if( typeof window !== 'undefined' && window !== this.domElement ){
		window.removeEventListener( 'mouseup', this.onPointer.bind(this) );
	}
 };