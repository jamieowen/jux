
var VerticalLayout = require( '@jux/layouts/Vertical' );

module.exports = function verticalLayout(){

	var data = require( './data' )();

	var layout = new VerticalLayout( data ,{
		itemWidth: 100,
		itemHeight: 100,
		itemSpacing: 0
	});

	layout.update();

	return layout;

};
