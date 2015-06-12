
var getBounds = require( '../bounds/getBounds' );

var transition = function( fromLayout, toLayout, transitionChild, opts ){

    opts = opts || {};
    opts.bounds = opts.bounds || null;
    opts.incOutBounds = opts.incOutBounds === undefined ? true : opts.incOutBounds;

    var bounds = opts.bounds || getBounds( fromLayout.element );

    var allChildren = fromLayout.element.children;
    var fromChildren = fromLayout.find( bounds );
    var toChildren = toLayout.find( bounds );

    // combine children from both to and from and store some metadata
    // [ child,
    // 0, 1, 2 - 0 appears in both from and to, 1 appears in 'from' only, 2 appears in 'to' only.

    var i,child,exists;
    var children = [];
    for( i = 0; i<fromChildren.length; i++ ){
        child = fromChildren[i];
        exists = toChildren.indexOf( child ) === -1 ? 1 : 0;
        children.push( [ child, exists, allChildren.indexOf(child) ] );
    }

    for( i = 0; i<toChildren.length; i++ ){
        child = toChildren[i];
        if( fromChildren.indexOf( child ) === -1 ){
            children.push( [ child,2, allChildren.indexOf(child) ] );
        }
    }

    // fakes need real data copied from children.
    var fakeFrom = {
        position:{},
        size:{}
        //scale: {},
        //rotation: {}
    };

    var fakeTo = {
        position:{},
        size:{}
        //scale: {},
        //rotation: {}
    };

    var entry,visibility,idx;

    // trigger transitions - on visible children
    for( i = 0; i<children.length; i++ ){

        entry = children[i];
        child = entry[0];
        visibility = entry[1];
        idx = entry[2];
        
        fakeTo.position.x = fakeFrom.position.x = child.position.x;
        fakeTo.position.y = fakeFrom.position.y = child.position.y;
        fakeTo.position.z = fakeFrom.position.z = child.position.z;

        fakeTo.size.width  = fakeFrom.size.width = child.size.width;
        fakeTo.size.height = fakeFrom.size.height = child.size.height;
        fakeTo.size.depth  = fakeFrom.size.depth = child.size.depth;

        toLayout.layoutElement( fakeTo, idx );
        fromLayout.layoutElement( fakeFrom, idx );
        
        transitionChild( child, fakeFrom, fakeTo, visibility, i, idx );
    }

    // trigger optional on out of bounds.
    if( opts.incOutBounds ) {
        idx = 0;
        for (i = 0; i < allChildren.length; i++) {

            child = allChildren[i];

            if( toChildren.indexOf(child) === -1 && fromChildren.indexOf(child)===-1 ){

                fakeTo.position.x = fakeFrom.position.x = child.position.x;
                fakeTo.position.y = fakeFrom.position.y = child.position.y;
                fakeTo.position.z = fakeFrom.position.z = child.position.z;

                fakeTo.size.width  = fakeFrom.size.width = child.size.width;
                fakeTo.size.height = fakeFrom.size.height = child.size.height;
                fakeTo.size.depth  = fakeFrom.size.depth = child.size.depth;

                toLayout.layoutElement( fakeTo, i );
                fromLayout.layoutElement( fakeFrom, i );

                transitionChild( child, fakeFrom, fakeTo, -1, i, i );
            }
        }
    }

};

module.exports = transition;



