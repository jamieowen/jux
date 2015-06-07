
var Rect = require( './Rect' );

var getInnerBounds = function( element )
{
    var bounds = new Rect();

    var children = element.children;
    var childBounds;

    for( var i = 0; i<children.length; i++ ){

        childBounds = children[i].getBounds();

        bounds.left = Math.min( bounds.left, childBounds.left );
        bounds.top = Math.min( bounds.top, childBounds.top );
        bounds.right = Math.max( bounds.right, childBounds.right );
        bounds.bottom = Math.max( bounds.bottom, childBounds.bottom );

    }

    bounds.width = bounds.right - bounds.left;
    bounds.height = bounds.bottom - bounds.top;

    return bounds;
};

module.exports = getInnerBounds;