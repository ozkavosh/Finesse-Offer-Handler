module.exports = (Discord, client) => {
    console.log('Bot iniciado correctamente!');
    console.log(`Logeado como: ${client.user.tag}`);
    client.user.setActivity('probar weas', {
		type: 'PLAYING'
	});
}
    
