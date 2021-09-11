module.exports = {
	name: "ping",
	description: "responde con pong!",
	async execute(client, message, args, Discord){
		message.reply({ content: 'Pong!', ephemeral: true });
	}
}