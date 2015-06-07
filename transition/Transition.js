

var transition = function( fromLayout, toLayout, transitionChild ){

    // fetch visible
    var bounds   = element.getBounds();
    var child,childBounds;
    var inBounds;

    if( fromLayout.childrenInBounds ){
        // get children like this if possible.

    }

    var mockFrom = {
        position:{},
        scale: {},
        rotation: {},
        size:{}
    };

    var mockTo = {
        position:{},
        scale: {},
        rotation: {},
        size:{}
    };

    var inBoundsFrom = fromLayout.inBounds || inBounds;
    var inBoundsTo = fromLayout.inBounds || inBounds;

    for( var i = 0; i<children.length; i++ ){

        child = children[i];

        fromLayout.layoutChild( mockFrom, i );
        toLayout.layoutChild( mockTo, i );

        childBounds = child.getBounds();
        inBounds = bounds.contains(childBounds);

        transitionChild( child, mockFrom, mockTo, inBounds )

    }

};

module.exports = transition;



