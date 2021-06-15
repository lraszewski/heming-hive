function handleError(error, req, res, next) {
	res.render('../views/home/error', { error: error });
}

module.exports = {
	handleError	
}