
var test 	= require( 'tape' );
var Proxy 	= require( '../src/bounds/BoundsProxy' );

test( 'set/get values', function(t){

	var proxy 		= new Proxy();
	var fetched,bounds;

	bounds  = proxy.create();
	// could check instanceof here?
	t.deepEquals( [ bounds.left, bounds.top, bounds.right, bounds.bottom ], [0,0,0,0], 'Bounds set to defaults.' );

	// set / get data
	var data1 = { id: 'hello' };
	fetched = proxy.create( data1 );
	proxy.data_set( fetched, data1 );
	var data2 = proxy.data_get( fetched );
	t.strictEquals( data2, data1, 'Proxy sets/gets data' );

	// set / get position.
	fetched = proxy.create();
	bounds  = proxy.create();
	proxy.position_set( bounds, 55, 66 );
	proxy.position_get( bounds, fetched );
	t.deepEquals( [ fetched.x, fetched.y ], [55,66], 'Proxy sets/gets position.' );

	// set / get size
	fetched = proxy.create();
	proxy.size_set( bounds, 100, 34 );
	proxy.size_get( bounds, fetched );
	t.deepEquals( [ fetched.width, fetched.height ], [100,34], 'Proxy sets/gets size.' );

	t.deepEquals( [ bounds.left, bounds.top, bounds.right, bounds.bottom ], [55,66,155,100], 'Proxy updates t,r,b,l.' );

	// set / get x.
	fetched = proxy.create();
	bounds  = proxy.create();
	proxy.x_set( bounds, 155 );
	fetched.x = proxy.x_get( bounds );
	t.equals( fetched.x, 155, 'Proxy sets/gets x.' );

	// set / get y.
	fetched = proxy.create();
	bounds  = proxy.create();
	proxy.y_set( bounds, 255 );
	fetched.y = proxy.y_get( bounds );
	t.equals( fetched.y, 255, 'Proxy sets/gets y.' );

	// set / get width.
	fetched = proxy.create();
	bounds  = proxy.create();
	proxy.width_set( bounds, 499 );
	fetched.width = proxy.width_get( bounds );
	t.equals( fetched.width, 499, 'Proxy sets/gets width.' );

	// set / get height.
	fetched = proxy.create();
	bounds  = proxy.create();
	proxy.height_set( bounds, 255 );
	fetched.height = proxy.height_get( bounds );
	t.equals( fetched.height, 255, 'Proxy sets/gets height.' );	

	// set / get bounds
	fetched = proxy.create();
	bounds  = proxy.create();
	proxy.bounds_set( bounds, 10, 20, 110, 100 );
	proxy.bounds_get( bounds, fetched );

	t.deepEquals( [ fetched.left, fetched.top, fetched.right, fetched.bottom ], [10,20,110,100], 'Proxy sets/gets bounds.' );
	t.deepEquals( [ fetched.x, fetched.y, fetched.width, fetched.height ], [10,20,100,80], 'Proxy updates x,y,w,h.' );

	t.end();
} );