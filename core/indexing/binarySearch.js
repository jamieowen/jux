
var Bounds 		 = require( '../bounds/Bounds' );
var searchBounds = require( './util/searchBounds' );

var BinarySearch = function( axis ){
	this.axis = axis === undefined ? 0 : axis;
};

module.exports = BinarySearch;

var sortX = function( obj, proxy ){


};

BinarySearch.prototype = {

	index: function( objects, proxy ){
		this.clear();
		this.objects = objects;

		var time = performance.now();
		this.objects.sort( function( a, b ){
			return proxy.x_get( a ) - proxy.x_get( b );
		} );

		var now = performance.now();
		console.log( 'SORT TIME : ', ( now - time ) );
	},

	find: function( viewBounds, proxy, results ){

		var idx,min,max,obj;
		var objects = this.objects;
		var end = false;

		if( this.axis === 0 ){

			idx = searchBounds.searchX( this.objects, viewBounds, proxy );

			if( idx === -1 ){
				return results;
			}

			results.push( objects[idx++] ); // first item is already in view
			max = viewBounds.right;

			while( !end && idx < objects.length ){
				obj = objects[idx++];
				min = proxy.x_get(obj);

				if( min < max ){
					results.push( obj );
				}else{
					end = true;
				}
			}

			return results;

		}else
		if( this.axis === 1 ){

			idx = searchBounds.searchY( this.objects, viewBounds, proxy );

			if( idx === -1 ){
				return results;
			}

			results.push( objects[idx++] ); // first item is already in view
			max = viewBounds.bottom;

			while( !end && idx < objects.length ){
				obj = objects[idx++];
				min = proxy.y_get(obj);

				if( min < max ){
					results.push( obj );
				}else{
					end = true;
				}
			}

			return results;

		}



	},

	clear: function(){

	},

	dispose: function(){
		this.clear();
		this.objects = null;
	}

};