
var Signal 		   = require( 'signals' );
var objectAssign   = require( 'object-assign' );

var Bounds 		   = require( './bounds/Bounds');
var DefaultProxy   = require( './bounds/BoundsProxy' );
var DefaultLayout  = require( './layouts/vertical' );
var DefaultIndexer = require( './indexing/binarySearch' );

var boundsHelper = new Bounds();


// Layout( data, opts, function(){}
// becomes..
/**

 new Layout( data,
 	{
 		axis: 'x' -- rename to direction ?
 		// -
 		indexer: new BinarySearch('x'),
 		dataIsRenderer: true

 	},
 	function( i, data, obj, prev, proxy ){

 	}
 );

 new Layout( data, {
 		axis: 'y',
 		proxy: {},
 		indexer: {},
 		},{
 			itemWidth:..,
 			itemHeight: ..
 		}

 	}

 layout.opts.width = 1000;
 layout.opts.itemWidth = 1000;

 var VList =
  Layout
  View
  Scroller

 List.proxy.extend( {
 added(
 } );


 */


var createObservableOpts = function( opts ){

	var ObservableOpts = new Function( 'Signal', [
		'return function ObservableOpts(){',
		'	this.onChanged = new Signal();',
		'}'
	].join('') );

	for( var key in opts ){

		ObservableOpts.prototype[ '_' + key ] = opts[key];

		Object.defineProperty( ObservableOpts.prototype, key, {
			get: new Function([
				'return this._' + key + ';'
			].join('')),
			set: new Function( 'value', [
				'this._' + key + ' = value;',
				'this.onChanged.dispatch("' + key + '")'
			].join(''))
		} );

	};

	return new ObservableOpts();

};

var createSignalOpts = function( opts, defaultOpts ){

	defaultOpts = defaultOpts || {};

	var construct = new Function( 'Layout', 'axis', 'defaultOpts', [
		'',
		'return function ' + className + 'Layout( data, opts ){',
		'	Layout.call( this, axis, opts, defaultOpts );',
		'	this.data = data;',
		'',
		'}',
		''
	].join('') );
};

//var Layout = function( data, config, opts, strategy ){
var Layout = function( data, optsOrLayout, defaultOpts ){

	if( typeof optsOrLayout === 'function' ){
		this._layout = optsOrLayout;
		this.layoutOpts = optsOrLayout.defaultOpts;
	}else
	if( typeof optsOrLayout === 'object' ){
		this._layout = optsOrLayout.layout || DefaultLayout;
		this.layoutOpts = optsOrLayout.layoutOpts || this._layout.defaultOpts;
	}else{
		this._layout = DefaultLayout;
		this.layoutOpts = DefaultLayout.defaultOpts;
		optsOrLayout = {};
	}

	this._data = data;

	this._proxy = optsOrLayout.proxy || new DefaultProxy();
	this._indexer = optsOrLayout.indexer || new DefaultIndexer(1);
	this._dataIsRenderer = optsOrLayout.dataIsRenderer === undefined ? false : optsOrLayout.dataIsRenderer;
	this._results = [];

	this.bounds = new Bounds();
	this.margin = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};
	this.objects = [];
	this.needsLayoutUpdate = true;
	this.needsIndexerUpdate = true;

	this.onLayoutUpdated = new Signal();

};


module.exports = Layout;

var createLayoutClass = function( className, config, defaultOpts, strategy ){

	defaultOpts = defaultOpts || {};

	var construct = new Function( 'Layout', 'axis', 'defaultOpts', [
		'',
		'return function ' + className + 'Layout( data, opts ){',
		'	Layout.call( this, axis, opts, defaultOpts );',
		'	this.data = data;',
		'',
		'}',
		''
	].join('') );

	var NewLayoutClass = construct( Layout, axis, defaultOpts );

	NewLayoutClass.prototype = Object.create( Layout.prototype );
	NewLayoutClass.prototype.constructor = NewLayoutClass;
	NewLayoutClass.prototype.layout = strategy;

	for( var key in defaultOpts ){

		NewLayoutClass.prototype[ '_' + key ] = defaultOpts[key];

		Object.defineProperty( NewLayoutClass.prototype, key, {
			get: new Function([
				'return this._' + key + ';'
			].join('')),
			set: new Function( 'value', [
				'this._' + key + ' = value;',
				'this.onChanged.dispatch("' + key + '")'
			].join(''))
		} );

	}

	return cls;

};


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
				if( this._dataIsRenderer ){
					obj = data;
				}else{
					obj = this._proxy.create( data );
					this._proxy.data_set( obj, data );
				}

				this._layout( i, data, obj, prevObj, this._proxy, this.layoutOpts );

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

		if( results ){
			return this._indexer.find( viewBounds, this._proxy, results );
		}else{
			this._results.splice(0);
			return this._indexer.find( viewBounds, this._proxy, this._results );
		}

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
	},

	layout: {
		get: function(){
			return this._layout;
		},

		set: function( layout ){
			if( this._layout === layout ){
				return;
			}

			this._layout = layout;

			this.needsLayoutUpdate = true;
			this.onLayoutUpdated.dispatch();
		}
	},

	indexer: {
		get: function(){
			return this._indexer;
		},

		set: function( indexer ){
			if( this._indexer === indexer ){
				return;
			}

			this._indexer = indexer;

			this.needsIndexerUpdate = true;

		}
	}

});