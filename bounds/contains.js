
var contains = function( target, rect )
{
    return (
        rect.left >= target.left &&
        rect.right <= target.right &&
        rect.top >= target.top &&
        rect.bottom <= target.bottom
    );
};

module.exports = contains;