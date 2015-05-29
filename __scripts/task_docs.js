
var glob     = require( 'glob' );
var path     = require( 'path' );
var fs       = require( 'fs' );
var cprocess = require( 'child_process' );
var jsdocmd  = require( 'jsdoc-to-markdown' );

var opts = { cwd:__dirname };
var packages = glob.sync( '../*/package.json', opts );

packages.map( function( pkg ){

    var folder = path.dirname( pkg ).replace('../', '' );
    var json = require( pkg );

    var command;

    if( json.jsdoc2md ){
        var files = json.jsdoc2md.map( function(file){
            return path.join( folder, file );
        });
        command = 'jsdoc2md ' + files.join( ' ' )
    }else{
        command = 'jsdoc2md ' + folder + '/*.js';
    }

    var packageMdFile = path.join( folder, 'PACKAGE.md' );
    var packageMdContents = '';

    if( fs.existsSync( packageMdFile ) ){
        packageMdContents = fs.readFileSync( packageMdFile, {encoding:'utf-8'} );
    }

    console.log( command );
    var jsdoc2MdContents = cprocess.execSync( command, { encoding:'utf-8' });

    var readmeMdFile = path.join) folder, 'README.md' );
    //fs.writeFileSync( )
    console.log( result );

} );