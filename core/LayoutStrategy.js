
var Signal = require( 'signals' );

var LayoutStrategy = function( axis, opts, defaultOpts ){

	this.axis 	= axis;
	this.opts 	= opts || defaultOpts;

	this.onChanged = new Signal();
};

LayoutStrategy.prototype = {

	constructor: LayoutStrategy,

	layout: null, // subclass will extend

	triggerChange: function(){

		this.onChanged.dispatch();

	}

};


var create = function( className, axis, defaultOpts, strategy ){

	defaultOpts = defaultOpts || {};

	var construct = new Function( 'BaseClass', 'axis', 'defaultOpts', [
		'',
		'return function ' + className + 'Layout( opts ){',
		'	BaseClass.call( this, axis, opts, defaultOpts );',
		'',
		'}',
		''
	].join('') );

	var cls = construct( LayoutStrategy, axis, defaultOpts );

	cls.prototype = Object.create( LayoutStrategy.prototype );
	cls.prototype.constructor = cls;
	cls.prototype.layout = strategy;

	for( var key in defaultOpts ){

		cls.prototype[ '_' + key ] = defaultOpts[key];

		Object.defineProperty( cls.prototype, key, {
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

module.exports = create;


/**
 // Try this out - then move to seperate package...

 dirtySetters( cls.prototype, {

		test: 10,
		test2: 12,
		value: 12

	},function changed( prop ){ // could extend this to allow different changed function for
		this.onChanged.dispatch( prop );
	});

var dirtySetters = function( proto, props, changed ){

	for( var key in props ){

		proto[ key ] = {
			get: new Function( 'changed', )
		}
	}


};

LayoutStrategy( 'Vertical', 'y', function( i, data, obj, prevObj ){

}, {

	ySpacing: 10,
	xSpacing: 10

} );

// vertical.js

var verticalLayout = new VerticalLayout( data, {
	xSpacing: 10,
	ySpacing: 10
});

verticalLayout.xSpacing = 20;

 **/
