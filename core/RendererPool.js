
var Signal 			= require( 'signals' );
var Bounds 			= require( './bounds/Bounds' );
var createExtends 	= require( './util/createExtends' );

var RendererPool = function(){

	this.onCreate = new Signal();
	this.onRelease = new Signal();

};


RendererPool.extend = createExtends( RendererPool );
module.exports = RendererPool;


RendererPool.prototype = {

	constructor: RendererPool,

	create: function( data ) {
		return new Bounds();
	},

	release: function( data ){

	}

};
