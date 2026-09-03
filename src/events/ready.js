// Bot hazır olduğunda çalışacak event
module.exports = {
	name: 'ready',
	once: false,
	execute(client) {
		console.log(`[BOT] ${client.user?.tag || 'Bot'} olarak başarıyla giriş yapıldı.`);
	},
};

