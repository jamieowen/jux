
var JuxNode = require( './JuxNode' );


var JuxDomNode = function(){
    JuxNode.call( this );
};

JuxDomNode.prototype = Object.create( JuxNode.prototype );

var Jux = {

    createElement: function( elementType, props, children ) {
        // html elements.
        console.log( 'createElement :', arguments );

        // Lookup Node
        //var node = new JuxNode();
        //node.type = elementType;

        return this.createNode( JuxDomNode, elementType, props, children );
    },

    createNode: function( nodeClass, nodeType, props, children ) {


        var node = new nodeClass();
        node.type = nodeType;

        //console.log( 'createNode', node );
        if( children && children.length ){
            for( var i = 0; i<children.length; i++ ){
                node.children.push( children[i] );
            }
        }

        return node;
    },

    createComponent: function( classOrPrototype ) {

        var construct;
        var name = classOrPrototype.viewClass == undefined ? 'Unknown' : classOrPrototype.viewClass;

        if (classOrPrototype instanceof Function) {
            construct = classOrPrototype;
        } else {
            // define a class on the fly.
            construct = function () {
                JuxNode.call(this);
            };

            construct.prototype = Object.create(JuxNode.prototype);

            for (var key in classOrPrototype) {
                construct.prototype[key] = classOrPrototype[key];
            }
        }

        // TODO : Throw an error ?

        var Jux = this;

        var createComponent = function(props, children) {
            return Jux.createNode( construct, name, props, children );
        }.bind(this);

        return createComponent;
    }
};


var JuxAppNode = function(){
    JuxNode.call(this);
};
JuxAppNode.prototype = Object.create( JuxNode.prototype );

var JuxExport = Jux.createComponent( JuxAppNode );

for( var key in Jux ){
    JuxExport[ key ] = Jux[ key ];
}
//JuxExport.createComponent   = Jux.createComponent;
//JuxExport.createElement     = Jux.createElement;
//JuxExport.createNode        = Jux.createNode;
//JuxExport.setFactory        =

module.exports = JuxExport;
