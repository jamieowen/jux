
var EventEmitter = require( 'events' );

var WheelEvents = function( domElement ){

    EventEmitter.call( this );

    this.domElement  = domElement;
    this.delta = [ 0,0,0 ]; // use vec3 as standard

    domElement.addEventListener( 'mousewheel', this.onMouseWheel.bind(this) );
    domElement.addEventListener( 'DOMMouseScroll', this.onMouseWheel.bind(this) );
};


WheelEvents.WHEEL_DELTA = 'wheel-delta';


module.exports = WheelEvents;
WheelEvents.prototype = Object.create( EventEmitter.prototype );


WheelEvents.prototype.onMouseWheel = function(event){

    event.preventDefault();

    this.delta[0] = isNaN( event.deltaX ) ? 0
        : event.deltaX;

    this.delta[1] = isNaN( event.deltaY ) ? 0
        : event.deltaY;

    this.delta[2] = isNaN( event.deltaZ ) ? 0
        : event.deltaZ;

    this.emit( WheelEvents.WHEEL_DELTA, WheelEvents.WHEEL_DELTA, this.delta );
};

WheelEvents.prototype.dispose = function(){

    //this.domElement.removeEventListener( 'mousewheel', this.onMouseWheel );
};


