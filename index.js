
module.exports = {

	Layout: require( './core/Layout' ),
	View: require( './core/View' ),
	Pool: require( './core/Pool' ),
	TypedPool: require( './core/TypedPool' ),
	//LoosePool: require( './core/LoosePool' ),

	Adapter: require( './core/Adapter' ),

	NoIndex: require( './indexing/NoIndex' ),
	AxisIndex: require( './indexing/AxisIndex' ),
	//GridIndex: require( './indexing/GridIndex' ),

	Scroller: require( './scroller/Scroller' ),
	ScrollerAxis: require( './scroller/ScrollerAxis' ),

	VerticalGrid: require( './layouts/VerticalGrid' ),
	HorizontalGrid: require( './layouts/HorizontalGrid' ),

	Pointer: require( './dom/Pointer' ),

	Swipe: require( './gestures/Swipe'),

	ThreePointer: require( './three/Pointer' ),
	ThreeAdapter: require( './three/Adapter' )
	
	//core: require( './core' ),
	//scroller: require( './scroller' )

};
