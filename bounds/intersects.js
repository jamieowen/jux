
var intersects = function( target, rect ){
    return !(
        rect.left >= target.right ||
        rect.right <= target.left ||
        rect.top >= target.bottom ||
        rect.bottom <= target.top
    )
};

module.exports = intersects;
