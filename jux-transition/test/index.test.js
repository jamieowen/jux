
var test = require( 'tape' );
var mapInnerObjects = require( '../mapInnerObjects' );

test('map-inner-objects', function(t) {

        // the set of tweenable properties
        var properties = {
            opacity: 1.0,

            position: {
                x: 100,
                y: 50
            },

            nested:{
                twice:{
                    here: 99
                }
            }
        };

        // the child that would be tested against to check
        // the existence of the above.

        var child = {
            opacity: 0.0,
            position: {
                x: 0,
                y: 0
            },

            nested:{
                twice: {
                    here: 0
                }
            }
        };

        // the expected result - a list of the actual objects on the child
        // and the new property values that would be set.
        var expected = [
            child, {opacity: 1.0},
            child.position, { x: 100, y: 50 },
            child.nested.twice, { here:99 } ];


        console.log( expected );

        var result = mapInnerObjects( properties, child );

        for( var i = 0; i<result.length; i+=2 ){
            console.log( '' );
            console.log( 'TARGET', result[i] );
            console.log( 'PROPS', result[i+1] );
        }

        t.deepLooseEqual( result, expected, 'object did not map correctly.' );

        console.log( '\nLENGTH : ', result.length + '\n' );

        t.equals(1, 1, 'both equal');
        t.end();

} );