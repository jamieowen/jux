
var Signal 		   = require( 'signals' );
var objectAssign   = require( 'object-assign' );

var ObservableOpts = require( './util/ObservableOpts' );
var Bounds 		   = require( './bounds/Bounds');

var RendererPool   = require( './RendererPool' );
var RendererProxy  = require( './RendererProxy' );

var boundsHelper = new Bounds();


var Layout = function( data, opts, config, layoutMethod ){

	if( !data || !opts || !config || !layoutMethod ){
		throw new Error( 'All arguments for Layouts must be specified.' );
	}

	// TODO : For ease of use - may be only ask for axis config..
	// Or default 2 'xy' BinarySearch

	if( !config.axis || !config.indexer ){
		throw new Error( 'Missing configuration arguments for Layout.' );
	}

	this.needsLayoutUpdate = true;
	this.needsIndexerUpdate = true;

	this.opts = ObservableOpts( opts );
	this.opts.onChanged.add( function(){
		this.needsLayoutUpdate = true;
	}.bind(this) );

	this._data 	 = data;

	this.axis    = config.axis;
	this.indexer = config.indexer;
	this.proxy   = config.proxy || new RendererProxy();
	this.pool	 = config.pool || new RendererPool();

	this.layout  = layoutMethod;

	//this.proxy = config.proxy || new DefaultProxy();
	//this.indexer = config.indexer || new DefaultIndexer(1);
	//this._dataIsRenderer = optsOrLayout.dataIsRenderer === undefined ? false : optsOrLayout.dataIsRenderer;

	this.bounds = new Bounds();
	this.padding = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};

	this.objects = [];


	this.onUpdate = new Signal();
	this.onUpdated = new Signal();
	this.onLayoutUpdated = new Signal();

};


module.exports = Layout;


Layout.prototype = {

	update: function(){

		if( this.needsLayoutUpdate ){

			this.needsLayoutUpdate = false;
			this.needsIndexerUpdate = true;

			this.objects.splice(0);
			this.bounds.set(0,0,0,0);

			var data,i,obj;
			var prevObj = null;
			var bounds = boundsHelper;

			for( i = 0; i<this._data.length; i++ ){

				data = this._data[i];

				// Need to look into multiple same data objects
				// here..Bounds - should just be regular pool
				// with no association to data object.

				obj = this.pool.create(data);//this.pool.get( data );
				this.proxy.data_set( obj, data );

				this.layout( i, data, obj, prevObj, this.proxy, this.opts );
				this.proxy.bounds_get( obj, bounds );

				this.bounds.x = Math.min( bounds.left, this.bounds.left );
				this.bounds.y = Math.min( bounds.top, this.bounds.top );
				this.bounds.width = Math.max( bounds.right, this.bounds.right );
				this.bounds.height = Math.max( bounds.bottom, this.bounds.bottom );

				this.objects.push( obj );

				prevObj = obj;

			}

		}

		if( this.needsIndexerUpdate ){
			this.needsIndexerUpdate = false;
			this.indexer.index( this.objects, this.proxy )
		}

	},

	find: function( viewBounds, results ){

		return this.indexer.find( viewBounds, this.proxy, results );

	},

	// override
	layout: function( i, data, obj, prevObj, proxy, opts ){

	}
};

Object.defineProperties( Layout.prototype, {

	data: {
		get: function(){
			return this._data;
		},

		set: function( data ){
			if( this._data === data ){
				return;
			}

			this._data = data;

			this.needsLayoutUpdate = true;
			this.onLayoutUpdated.dispatch();

		}
	}

});