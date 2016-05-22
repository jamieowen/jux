
var Signal 			= require( 'signals' );
var Bounds 			= require( './bounds/Bounds' );
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
		return new Bounds();
	},

	get: function( data ){

		var object = this.map.get( data );
		if( !object ){

			if( this.pool.length ){
				object = this.pool.shift();
				this.onRevive.dispatch( object,data );
			}else{
				object = this.create(data);
				this.onCreate.dispatch( object,data );
			}

			this.map.set( data, object );
		}
		return object;

	},

	release: function( data ){

		var pooled = this.map.get( data );
		if( pooled ){
			this.map.delete( data );
			this.pool.push( pooled );
			this.onRelease.dispatch( pooled, data );
			return pooled;
		}else{
			return null;
		}
	},

	clean: function(){

		var len = this.pool.length;
		if( len > this.maxSize ){
			this.pool.splice( this.maxSize );
		}
	}

};
