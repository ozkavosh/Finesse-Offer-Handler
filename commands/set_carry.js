module.exports = {/*Inicio export*/
    name: 'set_carry',
    description: 'Crea un formulario de boosteo',
    async execute(client, message, args, Discord) {/*Inicio ejecutar comando*/
        if(!message.member.roles.cache.has('881942073178202112')){
            return;
        }
        let roleId = '877594913758396446'; //Numero de ID de @Raid Booster
        var rol_tag = 0; //Numero de ID del mensaje enviado de arriba

        message.channel.send(`<@&${roleId}>`).then(msg => {
            rol_tag = msg.id; //Almacenar la ID del mensaje
        });

        let [fecha, hora, tipo_carry, cant_com, cant_fun, tipo_fun, cut_base, cut_fun] = args; //Argumentos de la venta


        const carry_embed = new Discord.MessageEmbed()/*FORMULARIO*/
            .setTitle('Abierto')
            .setColor('#660000')
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setThumbnail('https://finesseguild.online/img/logo.png')
            .setDescription('Aplica haciendo click en el emote de tu rol **SOLO** si estas comprometido a participar del carry. El aplicar y no presentarse o llegar tarde podría llegar a quitarte tu rango de booster. Reacciona con el cofre para anotarte como funnel, recuerda que como funnel debes pasar **todos** los items.')
            .addFields(
                { name: 'Fecha:', value: `${fecha}`, inline: true },
                { name: 'Hora:', value: `${hora}`, inline: true },
                { name: 'Tipo:', value: `${tipo_carry}`, inline: true },
                { name: 'Compradores:', value: `${cant_com}`, inline: true },
                { name: 'Funnels:', value: `${cant_fun}`, inline: true },
                { name: 'Tipo de Funnel:', value: `${tipo_fun}`, inline: true },
                { name: 'Cut base:', value: `<:coin1:884154885090725918> ${cut_base}`, inline: true },
                { name: 'Cut Funnel:', value: `<:coin1:884154885090725918> ${cut_fun}`, inline: true }
            );/*FIN FORMULARIO*/

        if (args[8]) {/*NOTAS*/
            let note = "";
            for (let i = 8; i < args.length; i++) {
                note += `${args[i]} `;
            }
            carry_embed.addField('Nota:', `${note}`, 'false');
        }/*FIN NOTAS*/


        message.delete(); //Borramos el mensaje enviado por el Advertiser
        message.channel.send({ embeds: [carry_embed] }) //Enviamos el formulario al chat
            .then(embedMessage => {/*Inicio formulario enviado*/
                embedMessage.react("884119963571458068");
                embedMessage.react("884119949512175647");
                embedMessage.react("884119949776420895");
                embedMessage.react("884474242605908090");
                embedMessage.react("✅");
                embedMessage.react("❎");
                
                });/*Fin formulario enviado*/

    }/*Fin ejecutar comando*/ 
}/*Fin export*/