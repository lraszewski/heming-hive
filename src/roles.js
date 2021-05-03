const accessControl = require('accesscontrol');
const ac = new accessControl();

function roles() {
	ac.grant("user")
		.readOwn("profile")
		.updateOwn("profile")

	ac.grant("student")
		.extend("user")
		.readAny("video")
	
	ac.grant("administrator")
		.extend("basic")
		.extend("student")
		.readAny("profile")
		.updateAny("profile")
		.deleteAny("profile")
		.createAny("video")
		.updateAny("video")
		.deleteAny("video")
}

module.exports = {
	roles
}