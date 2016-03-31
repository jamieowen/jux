
var Signal 			= require( 'signals' );
var Bounds 			= require( './bounds/Bounds' );
var createExtends 	= require( './util/createExtends' );
var WeakMap			= require( 'weak-map' );

var RendererPool = function(){

	this.onCreate = new Signal();
	this.onFree   = new Signal();

	this.maxSize = 100;
	this.pool 	 = [];
	this.map  	 = new WeakMap();

};


RendererPool.extend = createExtends( RendererPool );
module.exports = RendererPool;


RendererPool.prototype = {

	constructor: RendererPool,

	types: function(){
		return 0;
	},

	createByType: function( data ){

	},

	create: function( data ) {

		return new Bounds();
	},

	get: function( data ){

		var object = this.map.get( data );
		if( !object ){
			object = this.create(data);
			this.map.set( data, object );
		}
		return object;

	},

	release: function( data ){

		var pooled = this.map.get( data );
		if( pooled ){
			this.map.delete( data );
			this.pool.push( pooled );
		}
	},

	clean: function(){

		var len = this.pool.length;
		if( len > this.maxSize ){
			this.pool.splice( this.maxSize );
		}
	}

};
