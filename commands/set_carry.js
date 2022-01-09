var listas = require('../listas.js');
var fs = require('fs');
var json = JSON.stringify(listas.carrys);

module.exports = {/*Inicio export*/
  name: 'set_carry',
  description: 'Crea un formulario de boosteo',
  async execute(client, message, args, Discord) {/*Inicio ejecutar comando*/
    if (message.author.id !== '237390277558403074') {
      if (!message.member.roles.cache.has('881942073178202112')) {
        return;
      }
    }

    var id_advertiser, id_embed, carry_tipo, finalizado;

    let roleId = '877594913758396446'; //Numero de ID de @Raid Booster
    message.channel.send(`<@&${roleId}>`);

    let [fecha, hora, tipo_carry, cant_com, cant_fun, tipo_fun, cut_base] = args; //Argumentos de la venta

    id_advertiser = message.author.id;
    tipo_carry = args[2] ? args[2] : "No definido";
    finalizado = 0;

    const carry_embed = new Discord.MessageEmbed()/*FORMULARIO*/
      .setTitle('Abierto')
      .setColor('#660000')
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setThumbnail('https://finesseguild.online/img/logo.png')
      .setDescription('Aplica seleccionando las opciones **SOLO** si estas comprometido a participar del carry. Puedes aplicar con distintos personajes elegibles para el carry. El aplicar y no presentarse o llegar tarde podría llegar a quitarte tu rango de booster. Recuerda que al anotar como funnel debes poder pasar **todos** los items.')
      .addFields(
        { name: 'Fecha:', value: `${fecha}`, inline: true },
        { name: 'Hora:', value: `${hora}`, inline: true },
        { name: 'Tipo:', value: `${tipo_carry}`, inline: true },
        { name: 'Compradores:', value: `${cant_com}`, inline: true },
        { name: 'Funnels:', value: `${cant_fun}`, inline: true },
        { name: 'Tipo de Funnel:', value: `${tipo_fun}`, inline: true },
        { name: 'Cut:', value: `<:coin1:884154885090725918> ${cut_base}`, inline: true }
      );/*FIN FORMULARIO*/

    if (args[8]) {/*NOTAS*/
      let note = "";
      for (let i = 7; i < args.length; i++) {
        note += `${args[i]} `;
      }
      carry_embed.addField('Nota:', `${note}`, 'false');
    }/*FIN NOTAS*/


    /*BOTONES */
    const roles = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId('rol')
        .setPlaceholder('Rol')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: 'DPS',
            value: 'dps',
            emoji: '884119963571458068'
          },
          {
            label: 'Tank',
            value: 'tank',
            emoji: '884119949512175647'
          },
          {
            label: 'Heal',
            value: 'heal',
            emoji: '884119949776420895'
          }
        ]));

    const funnel = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId('funnel')
        .setPlaceholder('Funnel')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: 'Si',
            value: '1',
            description: 'Puede pasar TODOS los items incluidos 246',
            emoji: '✅'
          },
          {
            label: 'No',
            value: '0',
            description: 'No puede pasar todos los items',
            emoji: '❎'
          }
        ]));

    const clases = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId('clase')
        .setPlaceholder('Clase')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          {
            label: 'Guerrero',
            value: 'guerrero',
            emoji: '845438779557019708'
          },
          {
            label: 'Picaro',
            value: 'picaro',
            emoji: '845438838959505419'
          },
          {
            label: 'Sacerdote',
            value: 'sacerdote',
            emoji: '845438859058872325'
          },
          {
            label: 'Cazador de Demonios',
            value: 'dh',
            emoji: '845444856519458826'
          },
          {
            label: 'Caballero de la Muerte',
            value: 'dk',
            emoji: '845438966920773682'
          },
          {
            label: 'Paladin',
            value: 'paladin',
            emoji: '845438878382293012'
          },
          {
            label: 'Chaman',
            value: 'shaman',
            emoji: '845438820123017226'
          },
          {
            label: 'Druida',
            value: 'druida',
            emoji: '845441400980242447'
          },
          {
            label: 'Mago',
            value: 'mago',
            emoji: '845438895340388362'
          },
          {
            label: 'Brujo',
            value: 'brujo',
            emoji: '845438803605717032'
          },
          {
            label: 'Cazador',
            value: 'cazador',
            emoji: '845438912330465310'
          },
          {
            label: 'Monje',
            value: 'monje',
            emoji: '845445505734672404'
          }
        ]));

    const btn_enviar = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId('enviar')
        .setLabel('Aplicar')
        .setStyle('SUCCESS'),
      new Discord.MessageButton()
        .setCustomId('finalizar')
        .setLabel('Finalizar (Solo Advertiser)')
        .setStyle('PRIMARY')
    )
    /*FIN BOTONES*/

    message.delete(); //Borramos el mensaje enviado por el Advertiser
    message.channel.send({ embeds: [carry_embed], components: [roles, clases, funnel, btn_enviar] }) //Enviamos el formulario al chat
      .then(embedMessage => {/*Inicio formulario enviado*/
        id_embed = embedMessage.id;

        listas.carrys.push({ id: `${id_embed}`, advertiser_id: `${id_advertiser}` });

        json = JSON.stringify(listas.carrys); //convert it back to json
        fs.writeFile('carrys.json', json, 'utf8', function(err) {
          if (err) throw err;
          console.log('> Se creo un carry <');
        });

      });/*Fin formulario enviado*/
  }/*Fin ejecutar comando*/
}/*Fin export*/