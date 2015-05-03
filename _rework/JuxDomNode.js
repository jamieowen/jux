
var JuxNode = require( './JuxNode' );


var JuxDomNode = function(){
    JuxNode.call( this );
};

JuxDomNode.prototype = Object.create( JuxNode.prototype );

module.exports = JuxDomNode;