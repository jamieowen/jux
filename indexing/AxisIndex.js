
var Bounds 	   = require( '../core/bounds/Bounds' );
var intersects = require( '../core/bounds/intersects' );

var searchBounds = require( 'binary-search-bounds');

var compareRight = function( obj, arg ){
	return ( arg.proxy.x_get( obj ) + arg.proxy.width_get( obj ) ) - arg.value;
};

var AxisIndex = function(){

	this.min_get = null;
	this.max_get = null;

	this.objects = [];

};


var bounds = new Bounds();
module.exports = AxisIndex;

AxisIndex.prototype = {

	index: function( layout ){

		if( !layout.objects ){
			return;
		}

		var axis = layout.axis;
		var adapter = layout.adapter;

		this.axis = axis;
		if( axis === 'x' ){
			this.min_get = adapter.left_get;
			this.max_get = adapter.right_get;

			this.compare = function( a,b ){

				var r = adapter.right_get(a);
				return r - b;

			};

		}else
		if( axis === 'y' ){
			this.min_get = adapter.top_get;
			this.max_get = adapter.bottom_get;

			this.compare = function( a,b ){

				var r = adapter.bottom_get(a);
				return r - b;

			};
		}

		this.objects = layout.objects;

	},

	find: function( viewBounds, proxy, results ){

		var layoutItem;

		// Check NaN on viewBounds. ( or on layout )

		var viewMin,viewMax;

		if( this.axis === 'x' ){
			viewMin = viewBounds.left;
			viewMax = viewBounds.right;
		}else
		if( this.axis === 'y' ){
			viewMin = viewBounds.top;
			viewMax = viewBounds.bottom;
		}

		var i = searchBounds.gt( this.objects, viewMin , this.compare );

		while( i < this.objects.length ){

			layoutItem = this.objects[i];

			i++;

			if( this.max_get( layoutItem ) > viewMin && this.min_get( layoutItem ) < viewMax ){
				results.push( layoutItem );
			}else{
				i = this.objects.length;

			}

		}

	},

	dispose: function(){

	}

};

