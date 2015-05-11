
var Signal = require( 'jux-signal' );

var Pointer = function( element ) {

    this.element = element;

    this.position = [ 0, 0 ];
    this.previous = [ 0, 0 ];
    this.speed    = [ 0, 0 ];

    this.down       = false;
    this.dragOffset = [ 0, 0 ];
    this.dragStart  = [ 0, 0 ];

    // (todo) interaction events need to be abstracted to the proxy.
    this.element.addEventListener( 'mousemove', this.onPointer.bind(this) );
    this.element.addEventListener( 'mouseup', this.onPointer.bind(this) );
    this.element.addEventListener( 'mousedown', this.onPointer.bind(this) );

    this.signals = {
        down: new Signal(),
        up: new Signal(),
        move: new Signal(),
        drag: new Signal()
    }
};


module.exports = Pointer;


Pointer.prototype = {

    onPointer: function( event ){

        switch( event.type ){
            case 'mousemove' :

                this.__setPosition( event.clientX, event.clientY );
                this.signals.move.dispatch( this );

                break;
            case 'mouseup':

                //this.__setPosition( event.clientX, event.clientY );

                if( this.down ){
                    this.down = false;

                    this.signals.up.dispatch( this );
                }

                this.dragOffset[0] = this.dragOffset[1] = 0;
                this.dragStart[0] = this.dragStart[1] = 0;

                break;
            case 'mousedown':

                if( !this.down ){
                    this.down = true;
                    this.dragStart[ 0 ] = event.clientX;
                    this.dragStart[ 1 ] = event.clientY;

                    this.signals.down.dispatch( this );
                }
                this.__setPosition( event.clientX, event.clientY );
                break;
        }
    },

    __setPosition: function( x, y ){

        this.previous[0] = this.position[0];
        this.previous[1] = this.position[1];

        this.position[0] = x;
        this.position[1] = y;

        this.speed[0] = x - this.previous[0];
        this.speed[1] = y - this.previous[1];

        if( this.down ){
            this.dragOffset[0] = x - this.dragStart[ 0 ];
            this.dragOffset[1] = y - this.dragStart[ 1 ];
        }
    },

    dispose: function(){
        this.element.removeEventListener( 'mousemove', this.onPointer );
        this.element.removeEventListener( 'mouseup', this.onPointer );
        this.element.removeEventListener( 'mousedown', this.onPointer );
    }

};