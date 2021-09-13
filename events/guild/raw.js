var carrys = []; /*VECTOR DE CARRYS*/
var advertiser_id = ''; /*ID DEL CREADOR DEL FORMULARIO*/

const mysql = require('mysql');
    var con = mysql.createConnection({
      host: "sql10.freemysqlhosting.net",
      user: "sql10436751",
      password: "IKvPdz4fKe",
      port: "3306",
      database: "sql10436751",
      supportBigNumbers: "true"
    });

    con.connect(function(err) {
      if (err) throw err;
    });

module.exports = (Discord, client, event) => {/*INICIO EXPORTAR*/

    if (event.t === 'MESSAGE_CREATE' && event.d.content.startsWith('-set_carry')) {/*INICIO VERIFICAR MENSAJE*/
        advertiser_id = event.d.author.id;
    }/*FIN VERIFICAR MENSAJE*/

    if (event.t === 'MESSAGE_REACTION_ADD') {/*INICIO CONTROL DE REACCIONES*/
        let emojis_aceptados = ['dps','tank','heal','chest1','✅','❎'];
        let emoji_correcto = false;

        let canal = client.channels.cache.get(event.d.channel_id);
        let reaction = event.d.emoji;
        let userID = event.d.user_id;
        let messageID = event.d.message_id;
        let guildID = event.d.guild_id;
        let guild = client.guilds.cache.get(guildID);
        let user = event.d.member;

        for(e of emojis_aceptados){/*CONTROLAR EMOJIS ACEPTADOS */ 
            if(e === reaction.name){
                emoji_correcto = true;
            }
        }

        if(!emoji_correcto){
            return;
        }/*CONTROLAR EMOJIS ACEPTADOS */

        var aceptado = 0;

        if (reaction.name === 'dps' && userID === client.user.id) {/*INICIO ESTABLECER FORMULARIO DE CARRY*/
            carrys.push(({ advertiser: `${advertiser_id}`, embedID: `${messageID}`, finalizado: false }));
            console.log('Carrys cargados actualmente:');
            carrys.forEach(c => console.log(c));
        } else/*FIN ESTABLECER FORMULARIO DE CARRY*/
            if (reaction.name !== '✅' && reaction.name !== '❎' && userID !== client.user.id) {/*INICIO APPLY*/
                con.query('SELECT * FROM boosters', function(err, result) {
                    if (err) throw err;
                    for(let r of result){
                        if(r.id_booster === userID){
                            reaction.remove();
                            return;
                        }
                    }
                  });

                
                let rol = '';/*CONTROLAR ROLES | DAR FORMATO*/
                let rol_db = '';
                switch (reaction.name) {
                    case 'dps': rol = `<:dps:884119963571458068> DPS`;
                                rol_db = 'DPS';
                        break;
                    case 'heal': rol = `<:heal:884119949776420895> HEAL`;
                                 rol_db = 'HEAL';
                        break;
                    case 'tank': rol = `<:tank:884119949512175647> TANK`;
                                 rol_db = 'TANK';
                        break;
                    case 'chest1': rol = `<:chest1:884474242605908090> FUNNEL`;
                                   rol_db = 'FUNNEL';
                        break;
                }/*CONTROLAR ROLES | DAR FORMATO*/

                let control = false; /*Si el mensaje no pertenece a un carry no es necesario controlar*/
                let advertiser_actual; /*Almacenar la id del advertiser del carry*/
                let aplicante; /*Almacenar el nombre del aplicante*/
                let aplicante_id; /*Almacenar la id del aplicante*/

                for (let c of carrys) {/*CONTROLAR QUE EL MENSAJE PERTENEZCA A UN FORMULARIO DE CARRY*/
                    if (c.embedID === messageID && !c.finalizado) {
                        control = true;
                        advertiser_actual = c.advertiser;
                    }
                }

                if (!control) {
                    return;
                }/*CONTROLAR QUE EL MENSAJE PERTENEZCA A UN FORMULARIO DE CARRY*/

                /*ENVIO DE MENSAJES DIRECTOS*/
                client.users.fetch(userID).then((user) => { //Mensaje al aplicante
                    user.send(`Tu solicitud como ${rol} fue recibida con éxito, en caso de ser aceptado serás notificado por el canal de boosters. Gracias por aplicar al carry!`).catch(console.error);
                    aplicante = user.username;
                    aplicante_id = user.id;
                }).catch(console.error);

                client.users.fetch(advertiser_actual).then((user) => { //Mensaje al advertiser
                    user.send(`Se recibio una solicitud de ${aplicante} ${aplicante_id} como ${rol}`).then(dm => {
                        dm.react("✅");
                        dm.react("❎");
                    });
                }).catch(console.error);
                /*ENVIO DE MENSAJES DIRECTOS*/

            }/*FIN APPLY*/
            if(reaction.name === '✅'){/*INICIO COMPLETAR CARRY*/
                let control = false;
                for(c of carrys){
                    if(c.embedID === messageID && c.advertiser === userID){
                        control = true;
                    }
                    
                }

                if(!control){
                    return;
                }

                canal.messages.fetch(messageID).then(msg => {
                        const editEmbed = new Discord.MessageEmbed(msg.embeds[0])
                        .setTitle('Completo/Lleno')
                        .setDescription('Gracias por aplicar!')
                        .setColor('#006622');

                        msg.edit({embeds: [editEmbed]});
                        msg.reactions.removeAll();
                });
            }/*FIN COMPLETAR CARRY*/
            if(reaction.name === '❎'){/*INICIO CANCELAR CARRY*/
                let control = false;
                for(c of carrys){
                    if(c.embedID === messageID && c.advertiser === userID){
                        control = true;
                    }
                    
                }

                if(!control){
                    return;
                }

                canal.messages.fetch(messageID).then(msg => {
                        const editEmbed = new Discord.MessageEmbed(msg.embeds[0])
                        .setTitle('Cancelado')
                        .setDescription('Gracias por aplicar!')
                        .setColor('#d9d9d9');

                        msg.edit({embeds: [editEmbed]});
                        msg.reactions.removeAll();

                        c.finalizado = true;
                });
            }/*FIN CANCELAR CARRY*/

    }/*FIN CONTROL DE REACCIONES*/

}/*FIN EXPORTAR*/