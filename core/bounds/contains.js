
var contains = function( bounds, target )
{
	return (
		bounds.left >= target.left &&
		bounds.right <= target.right &&
		bounds.top >= target.top &&
		bounds.bottom <= target.bottom
	);
};

module.exports = contains;