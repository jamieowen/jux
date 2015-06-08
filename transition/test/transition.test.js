
var test = require( 'tape' );
var transition = require( '../Transition' );

var Layout = require( '../../layout/Layout' );


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

var verticalLayout = function( element, i ){
    element.position.x = 0;
    element.position.y = element.size.height * i;
};

var horizontalLayout =  function( element, i ){
    element.position.x = element.size.width * i;
    element.position.y = 0;
};

test( 'test layout transition visibility', function(t){

    // at this size the 2 layouts will clip children quite differently.
    var container = data( 400, 100, 100, 10 );

    var layoutFrom = new Layout( container, horizontalLayout );
    var layoutTo = new Layout( container, verticalLayout );

    // layout 'from' will have 4 visible children ( 400 / 100 )
    // layout 'to' will have 10 visible children. ( 100 / 10 )

    var fromCount = 0; // will be 4
    var toCount = 0; // will be 6
    var bothCount = 0; // will be 4

    transition( layoutFrom, layoutTo, function( child, frm, to, visibility ){
        if( visibility === 0 ){
            bothCount++;
        }else
        if( visibility === 1 ){
            fromCount++;
        }else
        if( visibility === 2 ){
            toCount++;
        }
    });

    t.equals( bothCount, 4, 'children visible in both to and from transition' );
    t.equals( fromCount, 0, 'children visible in just from transition' );
    t.equals( toCount, 6, 'children visible in just from transition' );


    // REVERSE...
    fromCount = toCount = bothCount = 0;

    transition( layoutTo, layoutFrom, function( child, frm, to, visibility ){
        if( visibility === 0 ){
            bothCount++;
        }else
        if( visibility === 1 ){
            fromCount++;
        }else
        if( visibility === 2 ){
            toCount++;
        }
    });

    t.equals( bothCount, 4, 'children visible in both to and from transition' );
    t.equals( fromCount, 6, 'children visible in just from transition' );
    t.equals( toCount, 0, 'children visible in just from transition' );

    t.end();
});

