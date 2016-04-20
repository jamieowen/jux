
var Swipe = function( direction, opts ){

	this.direction = direction;

};


Swipe.DIRECTION = {
	LEFT: 'left',
	RIGHT: 'right',
	UP: 'up',
	DOWN: 'down'
};


module.exports = Swipe;


Swipe.prototype = {

	pointerUp: function( x, y ){

	},

	pointerDown: function( x, y ){

	},

	pointerMove: function( x, y ){

	},

	_boundPointer: null,

	bindPointer: function( pointer ){

		if( this._boundPointer ){
			return;
		}

		// need to look at strict typing event names

		var that = this;
		this._boundPointer = {
			onMove: function(){

			}.bind(that),
			onDown: function(){

			}.bind(that),
			onUp: function(){

			}.bind(that)
		};

		pointer.on( 'move', function( ev ){
			this.pointerMove( ev.clientX, ev.clientY );
		} );
		this.pointer.on( Pointer.EVENT.CLICK, function( ev ){
			//console.log( 'CLICK',ev );
		} );
		this.pointer.on( Pointer.EVENT.DOWN, function( ev ){
			//console.log( 'DOWN',ev );
			this.pointerDown( ev.clientX, ev.clientY );
		} );
		this.pointer.on( Pointer.EVENT.UP, function( ev ){
			//console.log( 'UP',ev );
			scroller.pointerUp( ev.clientX, ev.clientY );
		} );

	},

	unbindPointer: function(){

	},

	_onPointer: function( type, event ){

	}

};