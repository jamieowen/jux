
var Jux = require( '@jux/core' );
var Scroller = require( '@jux/scroller' );
//var Pointer = require( '@jux/dom/Pointer' );
var Pointer = require( '@jux/three/Pointer' );

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

		var plane = new THREE.PlaneBufferGeometry( 300,300 );
		var mesh = new THREE.Mesh( plane, this.material );

		this.interactionPlane = mesh;
		this.scene.rotation.x = -Math.PI * 0.25;
		this.scene.add( mesh );

	},

	init: function(){

		var scope = this;

		this.scroller = new Scroller( {
			axes: [true,true,false]
		});

		this.pointer = new Pointer(
			this.renderer.domElement,
			this.camera,
			new THREE.Raycaster(),
			this.interactionPlane
		);

		this.scroller.bindPointer( this.pointer );

		this.view = new Jux.View( null, {

			container: this.scene,

			pool: Jux.RendererPool.extend( {

				create: function( data ){
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
					// no need to set here.
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

		var layout = this.view.layout;

		if( layout ){

			this.scroller.axes[0].max = layout.bounds.width;
			this.scroller.axes[1].max = layout.bounds.height;
			this.scroller.axes[0].viewSize = 10;
			this.scroller.axes[1].viewSize = 10;

		}

		var scrolled = this.scroller.update();

		if( scrolled ){

			this.view.position(
				this.scroller.axes[0].position,
				this.scroller.axes[1].position
			)

		}

		this.view.update();
		this.renderer.render( this.scene, this.camera );

		this.camera.position.z = 600;
		this.camera.position.y = -100;
		this.camera.position.x = -300;
		this.camera.lookAt( this.interactionPlane.position );

	},

	size: function( w, h ){

		this.renderer.setSize( w,h );

		this.camera.aspect = w/h;
		this.camera.updateProjectionMatrix();

		//this.view.size( 100,100 );
		this.view.size( w,h );
		//this.scroller.setViewSize( w,h );

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