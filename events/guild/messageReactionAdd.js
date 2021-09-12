module.exports = (Discord, client, MessageReaction, User) => {
    if (MessageReaction.message.reactions.cache.size > 6 && MessageReaction.message.author.id === client.user.id){
        MessageReaction.remove();
    }

    if(MessageReaction.message.content.includes('Se recibio una') && MessageReaction.emoji.name === '✅'){

        if(User.id === client.user.id){
            return;
        }

        const partes = MessageReaction.message.content.trim().split(/ +/g);

        client.users.fetch(partes[6]).then(usuario => {
            usuario.send('Fuiste aceptado para el carry!').catch(console.error);
        });

        MessageReaction.message.edit(`Aceptaste a ${partes[5]} para el carry`);
    }

    if(MessageReaction.message.content.includes('Se recibio una') && MessageReaction.emoji.name === '❎'){

        if(User.id === client.user.id){
            return;
        }

        const partes = MessageReaction.message.content.trim().split(/ +/g);

        MessageReaction.message.edit(`Rechazaste a ${partes[5]} para el carry`);
    }
}