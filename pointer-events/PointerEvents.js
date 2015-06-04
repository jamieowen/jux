
var EventEmitter = require( 'events' );

// Standardized PointerEvents for DomElements.

var PointerEvents = function( domElement ) {

    EventEmitter.call( this );
    
    this.domElement = domElement;

    this.start    = [ 0,0,0 ];
    this.position = [ 0,0,0 ]; // use vec3 as standard.
    this.previous = [ 0,0,0 ];

    this.down       = false;

    this.domElement.addEventListener( 'mousemove', this.onPointer.bind(this) );
    this.domElement.addEventListener( 'mouseup', this.onPointer.bind(this) );
    this.domElement.addEventListener( 'mousedown', this.onPointer.bind(this) );

    window.addEventListener( 'mouseup', this.onPointer.bind(this) );

};

PointerEvents.POINTER_DOWN  = 'pointer-down';
PointerEvents.POINTER_UP    = 'pointer-up';
PointerEvents.POINTER_MOVE  = 'pointer-move';

module.exports = PointerEvents;
PointerEvents.prototype = Object.create( EventEmitter.prototype );

PointerEvents.prototype.onPointer = function( event ){

    event.preventDefault();

    switch( event.type ){
        case 'mousemove' :

            this.__setPosition( event.clientX, event.clientY );
            this.emit( PointerEvents.POINTER_MOVE, PointerEvents.POINTER_MOVE, this.position );

            break;
        case 'mouseup':

            if( this.down ){
                this.down = false;
                this.emit( PointerEvents.POINTER_UP, PointerEvents.POINTER_UP, this.position );

                // clear start
                this.start[0] = 0;
                this.start[1] = 0;
            }

            break;
        case 'mousedown':

            this.__setPosition( event.clientX, event.clientY );

            if( !this.down ){
                this.down = true;
                this.start[0] = this.position[0];
                this.start[1] = this.position[1];

                this.emit( PointerEvents.POINTER_DOWN, PointerEvents.POINTER_DOWN, this.position );
            }

            break;
    }
};

PointerEvents.prototype.__setPosition = function( x, y ){

    this.previous[0] = this.position[0];
    this.previous[1] = this.position[1];

    this.position[0] = x;
    this.position[1] = y;
};

PointerEvents.prototype.dispose = function(){

    this.domElement.removeEventListener('mousemove', this.onPointer);
    this.domElement.removeEventListener('mouseup', this.onPointer);
    this.domElement.removeEventListener('mousedown', this.onPointer);
 };