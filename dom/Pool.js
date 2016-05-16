
var Pool = require( '../core/Pool' );

var DomRendererPool = Pool.extend( {

	create: function( data ){

		var ele = document.createElement( 'div' );
		ele.style.position = 'absolute';
		ele.style.display = 'block';
		ele.style.backgroundColor = '#999999';

		return ele;

	}

}, 'DomRendererPool', false );

DomRendererPool.extend = Pool.createExtends( DomRendererPool );
module.exports = DomRendererPool;