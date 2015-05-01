
var JuxNode = function(){

    this.type       = '';
    this.parent     = null;
    this.children   = [];
    this.owner      = null; // the node where this was defined in jsx
};


JuxNode.prototype = {

    update: function(){

    },

    etc: function(){

    }
};

var Jux = {

    createElement: function( elementType, props, children ) {
        // html elements.
        console.log( 'createElement :', arguments );

        var node = new JuxNode();
        node.type = elementType;

        if( children && children.length ){
            for( var i = 0; i<children.length; i++ ){
                node.children.push( children[i] );
            }
        }

        return node;
    },

    createComponent: function( classOrPrototype ) {

        var construct = null;
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
        var name = construct.prototype.viewClass == undefined ? 'Unknown' : construct.prototype.viewClass;
        var Jux = this;

        var createComponent = function(props, children) {
            console.log(this);

            var node = Jux.createElement(name, props, children);

            // TODO : Traverse this node downwards.
            // call build if needed, and attach the new nodes to the node tree.
            // i think???

            return node;
        }.bind(this);

        return createComponent;
    }
};


var JuxExport = Jux.createComponent({

    viewClass: 'Jux',
    build: function(){
        // would have to return constructed nodes, not as jsx. ( as this is a .js file )
    }

});

JuxExport.createComponent   = Jux.createComponent;
JuxExport.createElement     = Jux.createElement;
//JuxExport.setFactory        =

module.exports = JuxExport;
