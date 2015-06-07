
var visibleChildren = function( element, bounds ){

    if( !bounds ){
        bounds = element.getBounds();
    }

    var result = {
        inBounds: [],
        outBounds: []
    };

    var children = element.children;
    var child,childBounds;

    for( var i = 0; i<children.length; i++ ){
        child = children[ i ];
        childBounds = child.getBounds();

        if( bounds.contains( childBounds ) ){
            result.inBounds.push( child );
        }else {
            result.outBounds.push( child );
        }
    }

    return result;

};

module.exports = visibleChildren;