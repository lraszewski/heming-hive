const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
	ac.grant("user")
		.readOwn("profile")
		.updateOwn("profile")

	ac.grant("student")
		.extend("user")
		.readAny("lesson")
	
	ac.grant("administrator")
		.extend("user")
		.extend("student")
		.readAny("profile")
		.updateAny("profile")
		.deleteAny("profile")
		.createAny("lesson")
		.updateAny("lesson")
		.deleteAny("lesson")
	
	return ac;
})();