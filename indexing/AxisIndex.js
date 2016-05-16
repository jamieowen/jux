
var Bounds 	   = require( '../core/bounds/Bounds' );
var intersects = require( '../core/bounds/intersects' );

var searchBounds = require( 'binary-search-bounds');

var compareRight = function( obj, arg ){
	return ( arg.proxy.x_get( obj ) + arg.proxy.width_get( obj ) ) - arg.value;
};

var AxisIndex = function(){

	console.log( 'new axis index' );
	this.min_get = null;
	this.max_get = null;

};


var bounds = new Bounds();
module.exports = AxisIndex;

AxisIndex.prototype = {

	index: function( layout ){

		if( !layout.objects ){
			return;
		}

		var axis = layout.axis;
		var proxy = layout.proxy;

		this.axis = axis;
		if( axis === 'x' ){
			this.min_get = proxy.left_get;
			this.max_get = proxy.right_get;

			this.compare = function( a,b ){

				var r = proxy.right_get(a);
				return r - b;

			};

		}else
		if( axis === 'y' ){
			this.min_get = proxy.top_get;
			this.max_get = proxy.bottom_get;

			this.compare = function( a,b ){

				var r = proxy.bottom_get(a);
				return r - b;

			};
		}

		this.objects = layout.objects;




		//console.log( '>', res, this.objects, this.objects.length );

		//console.log( this.objects.slice( res-1, res + 5 ) );
	},

	find: function( viewBounds, proxy, results ){

		var layoutItem;

		// Check NaN on viewBounds. ( or on layout )

		var top = Math.floor( viewBounds.top );


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

