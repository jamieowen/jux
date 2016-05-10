
var CompleteExample = require( './CompleteExample' );

window.onload = function(){

	document.body.style.margin = '0px';

	var complete = new CompleteExample();

	var resize = function(){
		complete.size( window.innerWidth, window.innerHeight );
	};

	window.addEventListener( 'resize', resize );

	resize();

};