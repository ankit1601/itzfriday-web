var neo4j = require('neo4j-driver').v1;
var config = require('../config');

module.exports = {
	getSession(){
		var driver = getDriver();
		return driver.session();
	}
}
function getDriver(){
		return neo4j.driver(config.neoDbUrl,neo4j.auth.basic(config.neoDbUser,config.neoDbPassword));
}