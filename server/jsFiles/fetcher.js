module.exports = function()
{
	var faker = require("faker");
	var lodash = require("lodash");
	return {
		team : lodash.times(100000, function(n)
		{
			return {
				id: n,
				name: faker.name.findName(),
				avatar: faker.internet.avatar(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				contact: faker.phone.phoneNumber(),
			}
		})
	}
}