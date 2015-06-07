
var Element = require( '../../element' );
var test = require( 'tape' );

var visibleChildren = require( '../visibleChildren' );

var data = function() {

    var ele,container;
    var count = 10;
    var itemSize = 100;

    container = new Element();

    for( var i = 0; i<count; i++ ){
        ele = new Element();
        ele.position.set( 0, i*itemSize, 0 );
        ele.size.set( itemSize, itemSize, 0 );
        container.children.push( ele );
    }

    return container;
};

test( 'test visible children', function(t){

    var container = data();

    t.end();

} );
