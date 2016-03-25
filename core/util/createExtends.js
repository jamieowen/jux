
var createExtends = function( BaseClass ){

	return function( overrides, name, createNow ) {

		createNow = createNow === undefined ? true : createNow;

		if( !name ){
			name = 'Extended' + BaseClass.name;
		}

		var Constructor = new Function('BaseClass', [
				'return function ' + name + '(){',
				'	BaseClass.call( this );',
				'}'
			].join('\n'))(BaseClass);

		Constructor.prototype = Object.create( BaseClass.prototype );

		for( var key in overrides ){
			Constructor.prototype[key] = overrides[key];
		}

		if (createNow) {
			return new Constructor();
		} else {
			return Constructor;
		}
	}

};

module.exports = createExtends;