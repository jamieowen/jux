
var Signal 			= require( 'signals' );
var createExtends 	= require( './util/createExtends' );
var WeakMap			= require( 'weak-map' );

var TypedPool = function(){

	this.onRevive  = new Signal();
	this.onCreate  = new Signal();
	this.onRelease = new Signal();

	this.maxSize = 100;

	this.byType = {};

	// This 
	var types = this.listTypes();
	var key;

	for( var i = 0; i<types.length; i++ ){

		key = types[i];
		this.byType[ key ] = {
			pool: [],
			map: new WeakMap()
		}
		
	}

};

TypedPool.createExtends = createExtends;
TypedPool.extend = createExtends( TypedPool );
module.exports = TypedPool;


TypedPool.prototype = {

	constructor: TypedPool,

	listTypes: function(){
		return [];
	},

	getType: function( data ){

	},

	create: function( data, type ) {

	},

	get: function( data ){

		// Need to look into best method for Bounds / data.
		var type = this.getType(data.data);
		var map = this.byType[type].map;
		var object = map.get( data );

		if( !object ){

			var pool = this.byType[type].pool;

			if( pool.length ){
				object = pool.shift();
				this.onRevive.dispatch( object,data );
			}else{
				object = this.create(data,type);
				this.onCreate.dispatch( object,data );
			}

			map.set( data, object );

		}
		return object;

	},

	release: function( data ){

		// Need to look into best method for Bounds / data.
		var type = this.getType( data.data );
		var map = this.byType[type].map;
		var pooled = map.get( data );

		if( pooled ){
			var pool = this.byType[type].pool;
			map.delete( data );
			pool.push( pooled );
			this.onRelease.dispatch( pooled, data );
			return pooled;
		}else{
			return null;
		}
	},

	clean: function(){

		var pool,len;
		for( var key in this.byType ){

			pool = this.byType[key].pool;
			len = pool.length;
			if( len > this.maxSize ){
				pool.splice( this.maxSize );
			}

		}

	}

};
