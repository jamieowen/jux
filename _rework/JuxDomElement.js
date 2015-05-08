
var JuxElement = require( '../base/JuxElement' );


var JuxDomElement = function(){
    JuxElement.call( this );
};

JuxDomElement.prototype = Object.create( JuxElement.prototype );

module.exports = JuxDomElement;