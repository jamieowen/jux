
var RendererProxy = require( '@jux/core/RendererProxy' );

var ThreeRendererProxy = RendererProxy.extend( {

	data_get: function( threeObj ){
		return threeObj.userData;
	},

	data_set: function( threeObj, data ){
		threeObj.userData = data;
	},

	bounds_get: function( threeObj, bounds ){

		//bounds.x = obj.x;
		//bounds.y = obj.y;
		//bounds.width = obj.width;
		//bounds.height = obj.height;

	},

	bounds_set: function( threeObj, left, top, right, bottom ){

		//obj.x = left;
		//obj.y = top;
		//obj.width = right - left;
		//obj.height = bottom - top;
		
	},

	child_add: function( threeContainer, threeObj ){
		threeContainer.add( threeObj );
	},

	child_remove: function( threeContainer, threeObj ){
		threeContainer.remove( threeObj );
	},

	position_get: function( threeObj, point ){
		point.x = threeObj.position.x;
		point.y = threeObj.position.y;
	},

	position_set: function( threeObj, x, y ){
		threeObj.position.x = x;
		threeObj.position.y = y;
	},

	x_get: function( threeObj ){
		return threeObj.position.x;
	},

	x_set: function( threeObj, x ){
		threeObj.position.x = x;
	},

	y_get: function( threeObj ){
		return threeObj.position.y;
	},

	y_set: function( threeObj, y ){
		threeObj.position.y = y;
	},

	size_get: function( threeObj, bounds ){
		//bounds.width = threeObj.width;
		//bounds.height = threeObj.height;
	},

	size_set: function( threeObj, width, height ){
		//threeObj.width = width;
		//threeObj.height = height;
	},

	width_get: function( threeObj ){
		//return threeObj.width;
	},

	width_set: function( threeObj, width ){
		//threeObj.width = width;
	},

	height_get: function( threeObj ){
		//return threeObj.height;
	},

	height_set: function( threeObj, height ){
		//threeObj.height = height;
	}	

}, 'ThreeRendererProxy', false );


ThreeRendererProxy.extend = RendererProxy.createExtends( ThreeRendererProxy );
module.exports = ThreeRendererProxy;