
var JuxNode = function(){

    this.type           = '';
    this.parent         = null;
    this.children       = [];
    this.owner          = null; // the node where this was defined in jsx

    this.needsUpdate    = true;
    this.needsBuild     = true;

    this.proxyNode      = null; // sometimes nodes need to be passed through
};


JuxNode.prototype = {

    __build: function(){

        if( this.needsBuild ){
            this.needsBuild = false;

            // we have a build function which will return nodes.
            if( this.build ){

                // debatable as to whether we override or
                // modify access results via getter/setters.

                this.proxyNode = this.build();

                // TODO : sort this.
                // if we are a proxied node then we don't want {this} to iterate
                // on the children - shold be the proxies children.

                //this.children  = this.proxyNode.children;
                //this.type      = this.proxyNode.type;
            }

            // create view elements

            // is this does not have a proxy node.
            // 1. get nearest factory upwards
            // 2. create view for this node type
            // 3. add it to this parent.
            // 4. remap to different parent if proxy ( skip the proxied node )
        }

        var child;
        for( var i = 0; i<this.children.length; i++ ){

            child = this.children[i];
            child.__build();
        }

    },

    __update: function(){

        if( this.needsUpdate ){
            this.needsUpdate = false;

            // update this node.
            if( this.update ){
                this.update();
            }
        }

        // need to think about this order ?
        // TODO : updating proxy nodes.
        if( this.proxyNode ){
            this.proxyNode.__update();
        }

        // iterate.
        var child;
        for( var i = 0; i<this.children.length; i++ ){

            child = this.children[i];
            child.__update();
        }
    },

    etc: function(){

    }

};


module.exports = JuxNode;