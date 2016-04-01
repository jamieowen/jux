
var Signal 			= require( 'signals' );
var Bounds 			= require( './bounds/Bounds' );
var createExtends 	= require( './util/createExtends' );
var WeakMap			= require( 'weak-map' );

var RendererPool = function(){

	this.onRevive  = new Signal();
	this.onCreate  = new Signal();
	this.onRelease = new Signal();

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
