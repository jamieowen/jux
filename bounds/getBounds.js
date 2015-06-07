
var Rect = require( './Rect' );

var getBounds = function( element )
{
    var bounds = new Rect();

    bounds.left = element.position.x;
    bounds.top  = element.position.y;
    bounds.right = bounds.left + element.size.width;
    bounds.bottom = bounds.top + element.size.height;
    bounds.width = element.size.width;
    bounds.height = element.size.height;

    return bounds;
};

module.exports = getBounds;