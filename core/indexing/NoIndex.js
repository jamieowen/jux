
var Bounds 	   = require( '../bounds/Bounds' );
var intersects = require( '../bounds/intersects' );

var NoIndex = function(){

};

var bounds = new Bounds();
module.exports = NoIndex;

NoIndex.prototype = {

	index: function( objects, proxy ){

		this.clear();
		this.objects = objects;
	},

	find: function( viewBounds, proxy, results ){

		var layoutItem;
		for( var i = 0; i<this.objects.length; i++ ){
			layoutItem = this.objects[i];
			proxy.bounds_get( layoutItem, bounds );


			if( intersects( layoutItem, viewBounds ) ){
				//console.log( 'LO', layoutItem );
				results.push( layoutItem );
			}

		}

	},

	clear: function(){

	},

	dispose: function(){
		this.clear();
		this.objects = null;
	}

};

