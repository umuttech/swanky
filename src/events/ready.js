//bot başladığında hangi işlemlerin yapılacağını ayarlarsınız.
const uptimedb = require("croxydb")

module.exports = {
	name: 'ready',
	once: false,
	execute() {


		const { Monitor } = require("uprobot.js");

const links = uptimedb.fetch("uptimeLinks");
const monitor = new Monitor({ array: links, duration: 4000 });

monitor.start()



	},
};
