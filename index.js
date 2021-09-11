const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/views/index.html');
});
app.listen(3000, () => console.log(`FUNCIONAMIENTO CORRECTO`));

//----------------------------- SISTEMA 24/7 -----------------------------//

/*Segunda prueba de git =D*/

const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGES"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);});

client.login(token);