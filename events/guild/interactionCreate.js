var listas = require('../../listas.js');
const fs = require('fs');
let nombre = "";
let id = "";
let carry = "";
let rol = "";
let clase = "";
let funnel = "";

module.exports = async (Discord, client, interaction) => {
  if(!interaction.isSelectMenu()){
    if(!interaction.isButton()){
      return;
    }
  }

  try{
    nombre = interaction.member.displayName;
  }catch{
    nombre = interaction.user.username;
  }
  
  id = interaction.user.id;
  carry = interaction.message.id;

  let pos = 0;
  let flag = false;

  for (i = 0; i < listas.boosters.length; i++) {
    if (listas.boosters[i].id == interaction.user.id) {
      flag = true;
      pos = i;
    }
  }

  if(interaction.isButton() && interaction['customId'] == 'finalizar' && (interaction.user.id == '237390277558403074' || interaction.member.roles.cache.has('881942073178202112'))){
      const msg_finalizado = new Discord.MessageEmbed(interaction.message.embeds[0])
              .setTitle('Finalizado. Gracias por aplicar!')
              .setColor('#006622')
              .setDescription(`Ya no se aceptan mas aplicaciones.`)
              .setFooter(`${carry}`);

      interaction.message.edit({embeds: [msg_finalizado], components: []});

      //Borrar carry
      let carrys_nuevo = [];

      for(let c of listas.carrys){
        if(c.id !== interaction.message.id){
          carrys_nuevo.push(c);
        }
      }

      listas.carrys = carrys_nuevo;

      //Borrar boosters del carry
      let boosters_nuevo = [];

      for(let b of listas.boosters){
        if(b.carry !== interaction.message.id){
          boosters_nuevo.push(b);
        }
      }

      listas.boosters = boosters_nuevo;

      let json = JSON.stringify(listas.carrys); //convert it back to json
      fs.writeFile('carrys.json', json, 'utf8', function(err) {
          if (err) throw err;
          console.log('> Se finalizo un carry <');
      });

      interaction.deferUpdate();
  }

  if (interaction.isSelectMenu() && interaction['customId'] == 'rol') {
    rol = interaction['values'];
    if (flag) {
      listas.boosters[pos].rol = rol.toString();
    } else {
      listas.boosters.push({ nombre: `${nombre}`, id: `${id}`, rol: `${rol}`, clase: `${clase}`, funnel: `${funnel}`, carry: `${carry}` });
    }
    interaction.deferUpdate();
  }

  if (interaction.isSelectMenu() && interaction['customId'] == 'clase') {
    clase = interaction['values'];
    if (flag) {
      listas.boosters[pos].clase = clase.toString();
    } else {
      listas.boosters.push({ nombre: `${nombre}`, id: `${id}`, rol: `${rol}`, clase: `${clase}`, funnel: `${funnel}`, carry: `${carry}` });
    }
    interaction.deferUpdate();
  }

  if (interaction.isSelectMenu() && interaction['customId'] == 'funnel') {
    funnel = interaction['values'];
    if (flag) {
      listas.boosters[pos].funnel = funnel.toString();
    } else {
      listas.boosters.push({ nombre: `${nombre}`, id: `${id}`, rol: `${rol}`, clase: `${clase}`, funnel: `${funnel}`, carry: `${carry}` });
    }
    interaction.deferUpdate();
  }

  if (interaction.isButton() && interaction['customId'] == 'enviar') {
    rol = flag ? listas.boosters[pos].rol : "";

    switch (rol) {
      case 'dps': rol = `<:dps:884119963571458068> DPS`;
        break;
      case 'heal': rol = `<:heal:884119949776420895> HEAL`;
        break;
      case 'tank': rol = `<:tank:884119949512175647> TANK`;
        break;
    }

    clase = flag ? listas.boosters[pos].clase : "";
    funnel = flag ? listas.boosters[pos].funnel : "";

    switch (funnel) {
      case '1': funnel = 'Si';
        break;
      case '0': funnel = 'No';
        break;
    }

    if (rol == "" || clase == "" || funnel == "") {
      interaction.user.send({ ephemeral: true, content: "No se seleccionaron todas las opciones!" });
    } else {
      const msg_exito = new Discord.MessageEmbed()
              .setTitle('Apply enviado con éxito')
              .setColor('#660000')
              .setAuthor(nombre, interaction.user.avatarURL({ dynamic: true }))
              .setDescription(`Se recibio correctamente tu solicitud como ${rol}! en caso de ser aceptado serás notificado.`)
              .setThumbnail('https://finesseguild.online/img/logo.png')
              .setFooter(`${carry}`);

      interaction.user.send({embeds: [msg_exito]});

      for (let c of listas.carrys) {
        if (c.id == carry) {
          client.users.fetch(c.advertiser_id).then((user) => {
            const apply = new Discord.MessageEmbed()
              .setTitle('Booster Apply')
              .setColor('#660000')
              .setAuthor(nombre, interaction.user.avatarURL({ dynamic: true }))
              .setThumbnail('https://finesseguild.online/img/logo.png')
              .addFields(
                { name: 'Clase:', value: `${clase}`, inline: false },
                { name: 'Rol:', value: `${rol}`, inline: false },
                { name: 'Funnel:', value: `${funnel}`, inline: false }
              )
              .setFooter(`${carry}`);

            const botones = new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setCustomId('aceptar')
                .setLabel('Aceptar')
                .setStyle('SUCCESS'),
              new Discord.MessageButton()
                .setCustomId('rechazar')
                .setLabel('Rechazar')
                .setStyle('DANGER'),
            )

            //Mensaje al advertiser
            user.send({ embeds: [apply], components: [botones] }).then(dm => {
              const col = dm.createMessageComponentCollector({componentType: 'BUTTON', time: 18000000});

              const msg_aceptado = new Discord.MessageEmbed()
              .setTitle('Fuiste aceptado para el carry!')
              .setColor('#660000')
              .setAuthor(nombre, interaction.user.avatarURL({ dynamic: true }))
              .setDescription('Felicidades has sido aceptado para el carry, ante cualquier novedad mantente atento del canal de anuncios!')
              .setThumbnail('https://finesseguild.online/img/logo.png')
              .addFields(
                { name: 'Clase:', value: `${clase}`, inline: false },
                { name: 'Rol:', value: `${rol}`, inline: false },
                { name: 'Funnel:', value: `${funnel}`, inline: false }
              )
              .setFooter(`${carry}`);

              const btn_aceptado = new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setCustomId('aceptado')
                .setLabel('Aceptado')
                .setStyle('SUCCESS')
                .setDisabled(true)
            )

            const btn_rechazado = new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setCustomId('rechazado')
                .setLabel('Rechazado')
                .setStyle('DANGER')
                .setDisabled(true)
            )

              col.on('collect', async btn => {
                if (btn.customId === 'aceptar') {
		              interaction.user.send({embeds: [msg_aceptado]});
                  await btn.update({components: [btn_aceptado]})
                  console.log(`${interaction.user.username} fue aceptado para el carry`);
	              } else {
		              await btn.update({components: [btn_rechazado]});
                  console.log(`${interaction.user.username} fue rechazado para el carry`);
	              }
                col.stop();
              });

              col.on('end', collected => console.log(`Finalizo el collector de ${interaction.user.username}`));
            }).catch(console.error);
          }).catch(console.error);
        }
      }
    }
    console.log(listas.boosters);

    interaction.deferUpdate();
  }
}