const accessControl = require('accesscontrol');
const ac = new accessControl();

function roles() {
	ac.grant("user")
		.readOwn("profile")
		.updateOwn("profile")

	ac.grant("student")
		.extend("user")
		.readAny("lesson")
	
	ac.grant("administrator")
		.extend("basic")
		.extend("student")
		.readAny("profile")
		.updateAny("profile")
		.deleteAny("profile")
		.createAny("lesson")
		.updateAny("lesson")
		.deleteAny("lesson")
}

module.exports = {
	roles
}