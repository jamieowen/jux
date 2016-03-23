
var VerticalLayout = require( '../../layouts/Vertical' );

module.exports = function verticalLayout(){

	var data = [0,1,2,3,4,5,6,7,8,9].map( function(i){
		return { num: i };
	});

	var layout = new VerticalLayout( data ,{
		itemWidth: 100,
		itemHeight: 100,
		itemSpacing: 0
	});

	layout.update();

	return layout;

};
