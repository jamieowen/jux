var test = require( 'tape' );
var scrollConstraint = require( '../scrollConstraint' );

test( 'scroll-constraint', function(t){

    var min = -50;
    var max = 100;
    var current = 20;
    var overshoot = 20;

    var change = 10;
    var result = scrollConstraint( min, max, overshoot, current, change );

    t.equals( result, 0, 'test in bounds' );

    change = 80;
    result = scrollConstraint( min, max, overshoot, current, change );
    t.equals( result, 0, 'test edge of right bounds' );

    change = -70;
    result = scrollConstraint( min, max, overshoot, current, change );
    t.equals( result, 0, 'test edge of left bounds' );

    change = 90;
    result = scrollConstraint( min, max, overshoot, current, change );
    t.equals( result, 0.5, 'overshoot right 50%' );

    change = -80;
    result = scrollConstraint( min, max, overshoot, current, change );
    t.equals( result, -0.5, 'overshoot left 50%' );

    change = 120;
    result = scrollConstraint( min, max, overshoot, current, change );
    t.equals( result, 2, 'overshoot right 200%' );

    change = -110;
    result = scrollConstraint( min, max, overshoot, current, change );
    t.equals( result, -2, 'overshoot left 200%' );

    t.end();

});