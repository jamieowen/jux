
module.exports = {

	Layout: require( './core/Layout' ),
	View: require( './core/View' ),
	Pool: require( './core/Pool' ),
	//TypePool: require( './core/TypePool' ),
	//LoosePool: require( './core/LoosePool' ),
	Adaptor: require( './core/Adaptor' ),


	NoIndex: require( './indexing/NoIndex' ),
	AxisIndex: require( './indexing/AxisIndex' ),
	//GridIndex: require( './indexing/GridIndex' ),

	Scroller: require( './scroller/Scroller' ),
	ScrollerAxis: require( './scroller/ScrollerAxis' ),

	Pointer: require( './dom/Pointer' ),

	Swipe: require( './gestures/Swipe')
	
	
	
	
	//core: require( './core' ),
	//scroller: require( './scroller' )

};
