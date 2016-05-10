
// Jux

var VerticalGrid = require( '@jux/layouts/VerticalGrid' );

// Example
var ThreeView = require( './views/ThreeView' );


var CompleteExample = function(){

	this.state = null;
	this.data = [];

	var i = 100;
	while( i-- ){
		this.data.push( {
			idx: i
		})
	}

	// Create Jux Layouts.
	this.verticalGrid = new VerticalGrid( this.data,{

		gridWidth: 3,
		itemSpacing: 1,
		itemWidth: 20,
		itemHeight: 20

	} );


	// Create Jux View Setups.
	this.threeView = new ThreeView();

	// Set State
	this.currentView = null;
	this.currentLayout = null;

	this.setView( this.threeView );
	this.setLayout( this.verticalGrid );

	this.update = this.update.bind(this);
	this.update();

};


module.exports = CompleteExample;


CompleteExample.prototype = {

	update: function(){

		if( this.currentLayout ){
			this.currentLayout.update();
		}

		if( this.currentView ){
			this.currentView.update();
		}

		requestAnimationFrame( this.update );

	},

	size: function( w,h ){

		this._width = w;
		this._height = h;

		if( this.currentView ){
			this.currentView.size( w,h );
		}

	},

	setView: function( view ){

		if( this.view === view ){
			return;
		}

		if( this.currentView ){
			this.currentView.setActive( false );
		}

		this.currentView = view;

		if( this.currentView ){

			this.currentView.setActive( true );
			this.currentView.size( this._width,this._height );
			this.currentView.setLayout( this.currentLayout );

		}

	},

	setLayout: function( layout ){

		if( this.currentLayout === layout ){
			return;
		}

		this.currentLayout = layout;

		if( this.currentView ){
			this.currentView.setLayout( this.currentLayout );
		}

	}

};