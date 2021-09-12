module.exports = (Discord, client, MessageReaction, User) => {
    if (MessageReaction.message.reactions.cache.size > 6 && MessageReaction.message.author.id === client.user.id){
        MessageReaction.remove();
    }

    if(MessageReaction.message.content.includes('Se recibio una') && MessageReaction.emoji.name === '✅'){

        if(User.id === client.user.id){
            return;
        }

        const partes = MessageReaction.message.content.trim().split(/ +/g);

        if(partes[8]){
            switch(partes[9]){
                case 'dps': partes[9] = `<:dps:884119963571458068>`;  partes[10] = 'DPS';
                        break;
                    case 'heal': partes[9] = `<:heal:884119949776420895>HEAL`; partes[10] = 'HEAL';
                        break;
                    case 'tank': partes[9] = `<:tank:884119949512175647>TANK`; partes[10] = 'TANK';
                        break;
                    case 'chest1': partes[9] = `<:chest1:884474242605908090>FUNNEL`; partes[10] = 'FUNNEL';
                        break;
            }
        }

        client.users.fetch(partes[6]).then(usuario => {
            usuario.send(`Fuiste aceptado para el carry ! Tu rol es: ${partes[9]}`).catch(console.error);
        });

        MessageReaction.message.edit(`Aceptaste a ${partes[5]} para el carry`).catch(console.error);
    }

    if(MessageReaction.message.content.includes('Se recibio una') && MessageReaction.emoji.name === '❎'){

        if(User.id === client.user.id){
            return;
        }

        const partes = MessageReaction.message.content.trim().split(/ +/g);

        MessageReaction.message.edit(`Rechazaste a ${partes[5]} para el carry`).catch(console.error);
    }
}