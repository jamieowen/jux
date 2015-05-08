
var UpdatePass = function(){

    this.reset();
};

UpdatePass.prototype = {

    reset: function(){

        this.buildCount   = 0;
        this.updateCount  = 0;
        this.viewFactory  = null; // store the view factory as we traverse.
    }
};

module.exports = UpdatePass;