

var id = 0;

var JuxElement = function(){

    this.parent = null;
    this.children = [];
    this.uid = id++;

    this.needsUpdate = true;
    this.needsBuild  = true;
};

JuxElement.prototype = {

    __build: function(){

        if( this.needsBuild ){

            this.needsBuild = false;
            // set the scope which will set the factory.
            Jux.setScope( this );
            this.view = this.build();
        }

        var child;
        for( var i = 0; i<this.children.length; i++ ){
            child = this.children[i];
            child.__rebuild();
        }

    },

    __update: function(){

    },

    update: function(){

    },

    layout: function() {


    }

    },

    build: function(){

        return <div></div>;
    }
};


JuxContext = function(){
    JuxElement.call(this);
};

JuxContext.prototype = {

};