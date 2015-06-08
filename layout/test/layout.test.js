
var test    = require( 'tape' );

var getBounds = require( '../../bounds/getBounds' );
var Layout  = require( '../Layout' );

var mockObj = function( childW, childH ){
    // create a mock object that match the Element signature.
    return {
        position: { x: 0, y: 0, z: 0 },
        size: { width: childW, height: childH, depth: 0 },
        children: []
        // ignore rotation & scale.
    }
};

var data = function( rootW, rootH, childW, childH ){
    var root = mockObj( rootW, rootH );
    for( var i = 0; i<30; i++ ){
        root.children.push( mockObj( childW, childH ) );
    }
    return root;
};

test( 'basic vertical layout', function( t ){

    var element = data( 500,500, 10, 10 );
    var layout = new Layout( element, function( element, i ){
        element.position.y = i * element.size.height;
    });

    var i = element.children.length;
    var child;
    while( i-- ){
        child = element.children[i];
        t.equals( child.position.y, 0,'check child position y is 0' );
    }

    layout.layout();
    i = element.children.length;
    while( i-- ){
        child = element.children[i];
        t.equals( child.position.y, i * child.size.height, 'check child position is set.' );
    }

    t.end();
});


test( 'find children in bounds', function( t ){

    var element = data( 500,500, 10, 10 );
    var layout = new Layout( element, function( element, i ){
        element.position.y = i * element.size.height;
    });

    layout.layout();

    var bounds = {
        top: 0,
        left: 0,
        right: 500,
        bottom: 201
    };

    var result = layout.find( bounds );

    t.equals( result.length, 21, 'find children within bounds.' );

    t.end();

});