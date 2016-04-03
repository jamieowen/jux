
var RendererPool = require( '@jux/core/RendererPool' );

var DomRendererPool = RendererPool.extend( {

	create: function( data ){

		var ele = document.createElement( 'div' );
		ele.style.position = 'absolute';
		ele.style.display = 'block';
		ele.style.backgroundColor = '#999999';

		return ele;

	}

}, 'DomRendererPool', false );

DomRendererPool.extend = RendererPool.createExtends( DomRendererPool );
module.exports = DomRendererPool;