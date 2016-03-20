
var LayoutStrategy = require( '../LayoutStrategy' );


var VerticalLayout = LayoutStrategy( 'Vertical', 'y', function( i, prev, obj ){
	// etc

	//this.ySpacing ( )

}, {
	itemWidth: 960,
	itemHeight: 88,
	itemSpacing: 2
});

module.exports = VerticalLayout;