
var Signal 		 = require( 'signals' );
var objectAssign = require( 'object-assign' );

var cached = {};

var createObservableOpts = function( opts ){

	var id = Object.keys( opts ).join(',');
	var key;

	if( cached[id] ){
		var instance = new cached[id]();

		for( key in opts ){
			instance[ key ] = opts[ key ];
		}

		return instance;
	}

	var ObservableOpts = new Function( 'Signal', 'objectAssign', [
		'return function ObservableOpts( opts ){',
		'	this.onChanged = new Signal();',
		'	objectAssign( this, opts );',
		'}'
	].join('') )( Signal, objectAssign );

	ObservableOpts.prototype.constructor = ObservableOpts;

	for( key in opts ){

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

	}

	cached[id] = ObservableOpts;
	return new ObservableOpts( opts );

};

module.exports = createObservableOpts;