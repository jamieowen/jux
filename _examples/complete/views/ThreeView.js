
var Jux = require( '@jux/core' );
//var JuxThree = require( '@jux/three' );

var THREE = require( 'three' );


var ThreeView = function(){

	this._width = 1280;
	this._height = 1024;

	this.layout = null;
	this.view 	= null;

	this.setup();
	this.init();

};

module.exports = ThreeView;

ThreeView.prototype = {

	setup: function(){

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 45, 4/3, 1,1000 );

		this.renderer = new THREE.WebGLRenderer( {
			antialias: true
		});

		this.renderer.setPixelRatio( Math.min( window.devicePixelRatio,2 ) );
		this.renderer.setClearColor( 0x000000, 1 );

		this.geometry = new THREE.SphereBufferGeometry(9);
		this.material = new THREE.MeshBasicMaterial( {
			wireframe: true,
			color: 0xFF0000
		});

		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.scene.add( this.mesh );

	},

	init: function(){

		var scope = this;
		// initialise with an Empty layout.
		this.view = new Jux.View( null, {

			container: this.scene,

			pool: Jux.RendererPool.extend( {

				create: function( data ){

					console.log( 'CREATE' );
					return new THREE.Mesh( scope.geometry, scope.material );

				}

			}),

			proxy: Jux.RendererProxy.extend( {

				data_set: function( threeObj, data ){
					threeObj.userData = data;
				},

				position_set: function( threeObj, x, y ){
					threeObj.position.x = x;
					threeObj.position.y = -y;
				},

				size_set: function( threeObj, w, h ){

				},

				child_add: function( threeContainer, threeObj ){
					threeContainer.add( threeObj );
				},

				child_remove: function( threeContainer, threeObj ){
					threeContainer.remove( threeObj );
				}

			})
		});
	},

	update: function(){

		this.view.viewport(
			0,0,
			400,300
		);

		this.view.update();
		this.renderer.render( this.scene, this.camera );

		this.camera.position.z = 500;

	},

	size: function( w, h ){

		this.renderer.setSize( w,h );

		this.camera.aspect = w/h;
		this.camera.updateProjectionMatrix();

	},

	setLayout: function( layout ){

		this.view.layout = layout;

	},

	setActive: function( active ){

		if( active ){
			document.body.appendChild( this.renderer.domElement );
		}else{
			document.body.removeChild( this.renderer.domElement );
		}
	}

};