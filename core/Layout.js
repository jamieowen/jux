
var Signal 		   = require( 'signals' );
var objectAssign   = require( 'object-assign' );

var ObservableOpts = require( './util/ObservableOpts' );
var Bounds 		   = require( './bounds/Bounds');

var boundsHelper = new Bounds();


var Layout = function( data, opts, config, layoutMethod ){

	if( !data || !opts || !config || !layoutMethod ){
		throw new Error( 'All arguments for Layouts must be specified.' );
	}

	// TODO : For ease of use - may be only ask for axis config..
	// Or default 2 'xy' BinarySearch

	if( !config.axis || !config.proxy || config.indexer ){
		throw new Error( 'Missing configuration arguments for Layout.' );
	}

	this.needsLayoutUpdate = true;
	this.needsIndexerUpdate = true;

	this.onOptsChanged = this.onOptsChanged.bind(this);
	this.opts = ObservableOpts( opts );
	this.opts.onChanged.add( function(){
		this.needsLayoutUpdate = true;
	}.bind(this) );

	this._data 	 = data;
	this.axis    = config.axis;
	this.proxy   = config.proxy;
	this.indexer = config.indexer;
	this.layout  = layoutMethod;


	//this._proxy = config.proxy || new DefaultProxy();
	//this._indexer = config.indexer || new DefaultIndexer(1);
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
				//if( this._dataIsRenderer ){
				//	obj = data;
				//}else{
					obj = this._proxy.create( data );
					this._proxy.data_set( obj, data );
				//}

				this._layout( i, data, obj, prevObj, this._proxy, this.opts );
				this._proxy.bounds_get( obj, bounds );

				// bounds expand() ?
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
			this._indexer.index( this.objects, this._proxy )
		}

	},

	find: function( viewBounds, results ){

		return this._indexer.find( viewBounds, this._proxy, results );

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