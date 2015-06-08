
var getBounds  = require( '../bounds/getBounds' );
var intersects = require( '../bounds/intersects' );

var Layout = function( element, layoutStrategy ){

    this.element = element;

    if( !layoutStrategy ){
        layoutStrategy = function( element, iy ){
            element.position.y = iy * element.size.y;
            return null;
        }
    }

    this.__layoutStrategy = layoutStrategy;
};

var create = function( element, layoutStrategy ){
    return new Layout( element, layoutStrategy );
};

create.Layout = Layout;
module.exports = create;


Layout.prototype = {

    layoutElement: function( element, idx ){

        this.__layoutStrategy( element, idx );
    },

    find: function( bounds ){

        if( this.index ){
            return this.index.find( bounds );
        }

        var fakeElement = {
            position:{},
            scale: {},
            rotation: {},
            size:{}
        };

        var children = this.element.children;
        var child,childBounds;

        var results = [];

        // apply the layout to fake elements but return
        // real elements. a bit slower but allows
        // elements not to have had the layout applied yet.
        // which is useful for transitions between layouts.

        for( var i = 0; i<children.length; i++ ){

            child = children[i];

            // copy only objects currently affecting scale
            fakeElement.position.x = child.position.x;
            fakeElement.position.y = child.position.y;
            fakeElement.position.z = child.position.z;

            fakeElement.size.width = child.size.width;
            fakeElement.size.height = child.size.height;
            fakeElement.size.depth = child.size.depth;
            
            this.layoutElement( fakeElement, i );

            childBounds = getBounds( fakeElement );

            if( intersects( bounds, childBounds ) ){

                results.push( child );
            }
        }

        return results;

    },

    layout: function(){

        var children = this.element.children;
        var child;
        var layoutElement = this.__layoutStrategy;

        for( var i = 0; i<children.length; i++ )
        {
            child = children[i];
            layoutElement( child, i );

            // ? Bounds could be calculated and stored in index for faster find() lookup.
        }
    }

};


// Bind Layout to Element?
// - Allows caching / indexing of layout positions.
// - If an element changes the layout can reapply.
// - Transition can query layout for visible.

// Layout should be simple and

// Don't Bind Element
// Reuse layouts.