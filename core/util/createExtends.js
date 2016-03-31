
var createExtends = function( BaseClass ){

	return function( overrides, name, create ) {

		create = create === undefined ? true : create;

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

		if (create) {
			return new Constructor();
		} else {
			return Constructor;
		}
	}

};

module.exports = createExtends;