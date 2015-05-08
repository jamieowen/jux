
var JuxElement          = require( '../base/JuxElement' );
var JuxDomElement       = require( './JuxDomElement' );
var JuxContext          = require( '../base/JuxContext' );

var jsxParsePosition    = require( '../jsx/jsxParsePosition' );
var jsxMergeParse       = require( '../jsx/jsxMergeParse' );
var jsxParseSize        = require( '../jsx/jsxParseSize' );

var Jux = {

    parsers: {},

    addPropertyParsers: function( obj ){

        for( var p in obj ){
            this.parsers[ p ] = obj[p];
        }
    },

    createElement: function( elementType, props, children ) {
        // html elements.
        console.log( 'createElement :', arguments );

        // Lookup Node
        //var node = new JuxNode();
        //node.type = elementType;

        return this.createNode( JuxDomElement, elementType, props, children );
    },

    createNode: function( nodeClass, nodeType, props, children ) {

        var node = new nodeClass();
        node.type = nodeType;

        var parse;

        // parse properties.
        for( var prop in props ){
            parse = this.parsers[ prop ];

            if( parse ){
                parse( node, props[prop] );
            }else{
                throw new Error( 'Property with name :' + prop + ' not parsed.' );
            }
        }

        //console.log( 'createNode', node );
        if( children && children.length ){
            for( var i = 0; i<children.length; i++ ){
                node.add( children[i] );
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
                JuxElement.call(this);
            };

            construct.prototype = Object.create(JuxElement.prototype);

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

// add default parsers.
Jux.addPropertyParsers( jsxMergeParse( jsxParsePosition, jsxParseSize) );


var JuxExport = Jux.createComponent( JuxContext );

for( var key in Jux ){
    JuxExport[ key ] = Jux[ key ];
}

//JuxExport.createComponent   = Jux.createComponent;
//JuxExport.createElement     = Jux.createElement;
//JuxExport.createNode        = Jux.createNode;
//JuxExport.setFactory        =

module.exports = JuxExport;
