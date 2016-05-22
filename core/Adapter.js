
var createExtends 	= require( './util/createExtends' );

var RendererAdapter = function(){

};


RendererAdapter.createExtends = createExtends;
RendererAdapter.extend = createExtends( RendererAdapter );
module.exports = RendererAdapter;


RendererAdapter.prototype = {

	constructor: RendererAdapter,

	data_get: function( obj ){
		return obj.data;
	},

	data_set: function( obj, data ){
		obj.data = data;
	},

	bounds_get: function( obj, bounds ){
		bounds.x = obj.x;
		bounds.y = obj.y;
		bounds.width = obj.width;
		bounds.height = obj.height;
	},

	bounds_set: function( obj, left, top, right, bottom ){
		obj.x = left;
		obj.y = top;
		obj.width = right - left;
		obj.height = bottom - top;
	},

	position_get: function( obj, point ){
		point.x = obj.x;
		point.y = obj.y;
	},

	position_set: function( obj, x, y ){
		obj.x = x;
		obj.y = y;
	},

	left_get: function( obj ){
		return obj.left;
	},

	right_get: function( obj ){
		return obj.right
	},

	top_get: function( obj ){
		return obj.top;
	},

	bottom_get: function( obj ){
		return obj.bottom;
	},

	x_get: function( obj ){
		return obj.x;
	},

	x_set: function( obj, x ){
		obj.x = x;
	},

	y_get: function( obj ){
		return obj.y;
	},

	y_set: function( obj, y ){
		obj.y = y;
	},

	size_get: function( obj, bounds ){
		bounds.width = obj.width;
		bounds.height = obj.height;
	},

	size_set: function( obj, width, height ){
		obj.width = width;
		obj.height = height;
	},

	width_get: function( obj ){
		return obj.width;
	},

	width_set: function( obj, width ){
		obj.width = width;
	},

	height_get: function( obj ){
		return obj.height;
	},

	height_set: function( obj, height ){
		obj.height = height;
	}

	// rotation?

};