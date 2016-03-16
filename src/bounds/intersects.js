
var intersects = function( target, bounds ){
	return !(
		bounds.left >= target.right ||
		bounds.right <= target.left ||
		bounds.top >= target.bottom ||
		bounds.bottom <= target.top
	)
};

module.exports = intersects;