
var Adaptor = require( '../core/Adaptor' );

var DomAdaptor = Adaptor.extend( {

	data_get: function( domElement ){
		//return domElement.userData;
	},

	data_set: function( domElement, data ){
		//domElement.userData = data;
	},

	bounds_get: function( domElement, bounds ){

		//bounds.x = obj.x;
		//bounds.y = obj.y;
		//bounds.width = obj.width;
		//bounds.height = obj.height;

	},

	bounds_set: function( domElement, left, top, right, bottom ){

		//obj.x = left;
		//obj.y = top;
		//obj.width = right - left;
		//obj.height = bottom - top;

	},

	child_add: function( domContainer, domElement ){
		domContainer.appendChild( domElement );
	},

	child_remove: function( domContainer, domElement ){
		domContainer.removeChild( domElement );
	},

	position_get: function( domElement, point ){
		//point.x = domElement.position.x;
		//point.y = domElement.position.y;
	},

	position_set: function( domElement, x, y ){
		domElement.style.left = x + 'px';
		domElement.style.top  = y + 'px';
	},

	x_get: function( domElement ){
		//return domElement.position.x;
	},

	x_set: function( domElement, x ){
		domElement.style.left = x + 'px';
	},

	y_get: function( domElement ){
		//return domElement.position.y;
	},

	y_set: function( domElement, y ){
		domElement.style.top = y + 'px';
	},

	size_get: function( domElement, bounds ){
		//bounds.width = domElement.width;
		//bounds.height = domElement.height;
	},

	size_set: function( domElement, width, height ){
		domElement.style.width  = width + 'px';
		domElement.style.height = height + 'px';
	},

	width_get: function( domElement ){
		//return domElement.width;
	},

	width_set: function( domElement, width ){
		domElement.style.width  = width + 'px';
	},

	height_get: function( domElement ){
		//return domElement.height;
	},

	height_set: function( domElement, height ){
		domElement.style.height = height + 'px';
	}

}, 'DomAdaptor', false );


DomAdaptor.extend = Adaptor.createExtends( DomAdaptor );
module.exports = DomAdaptor;