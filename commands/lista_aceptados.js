const fs = require('fs');
let listas = require('../listas.js');

module.exports = {/*Inicio export*/
  name: 'lista_aceptados',
  description: 'Ver la lista de aceptados de un carry',
  async execute(client, message, args, Discord) {/*Inicio ejecutar comando*/
    if (message.author.id !== '237390277558403074') {
      if (!message.member.roles.cache.has('881942073178202112')) {
        return;
      }
    }

    let [id] = args;

    if(!id){
      message.channel.send("Por favor ingresa la ID del carry!");
      return;
    };

    let flag = false;
    for(let c of listas.carrys){
      if(c.id == id){
        flag = true;
      }
    }

    if(!flag){
      message.channel.send("No se encontró el carry!");
      return;
    }

    let emojisId = ['<:warrior:929953277741781022>', '<:rogue:929953277330747394>', '<:priest:929953277360078869>', '<:dh:929953277720797234>', '<:dk:929953277032955916>', '<:paladin:929953277527871539>', '<:shaman:929953277511102484>', '<:druid:929953277376880650>', '<:magician:929953277443964958>', '<:warlock:929953277506904064>', '<:hunter:929953277485920286>', '<:monk:929953277364301856>'];

    let dps = [];
    let heals = [];
    let tanks = [];
    let icono = "";
    for(let a of listas.aplicantes){
        if(a.aceptado == 1 && a.test_carryId == id){
          switch(a.test_clase){
            case "guerrero":
                            icono = emojisId[0];
                            break;
            case "picaro":
                            icono = emojisId[1];
                            break;
            case "sacerdote":
                            icono = emojisId[2];
                            break;
            case "dh":
                            icono = emojisId[3];
                            break;
            case "dk":
                            icono = emojisId[4];
                            break; 
            case "paladin":
                            icono = emojisId[5];
                            break;
            case "chaman":
                            icono = emojisId[6];
                            break; 
            case "druida":
                            icono = emojisId[7];
                            break; 
            case "mago":
                            icono = emojisId[8];
                            break; 
            case "brujo":
                            icono = emojisId[9];
                            break;
            case "cazador":
                            icono = emojisId[10];
                            break;
            case "monje":
                            icono = emojisId[11];
                            break;           
          }
          if(a.test_rol.includes('DPS')){
            dps.push(`<@${a.test_id}> ${icono}\n`);
          }else
          if(a.test_rol.includes('TANK')){
            tanks.push(`<@${a.test_id}>  ${icono}\n`);
          }else
          if(a.test_rol.includes('HEAL')){
            heals.push(`<@${a.test_id}>  ${icono}\n`);
          }
        }
    }

    if(!dps.length){
      dps.push("TBD");
    }

    if(!tanks.length){
      tanks.push("TBD");
    }
    
    if(!heals.length){
      heals.push("TBD");
    }

    let lista = new Discord.MessageEmbed()/*FORMULARIO*/
      .setTitle(`Lista de Aceptados`)
      .setColor('#660000')
      .setThumbnail('https://finesseguild.online/img/logo.png')
      .setDescription(`Aqui se muestran los boosters aceptados para el carry ${id}`)
      .addFields(
        { name: '<:tank:884119949512175647> Tanks:', value: `${tanks}`, inline: true },
        { name: '<:dps:884119963571458068> DPS:', value: `${dps}`, inline: true },
        { name: '<:heal:884119949776420895> Heals:', value: `${heals}`, inline: true }
      );/*FIN FORMULARIO*/

    message.channel.send({ embeds: [lista]});
  }/*Fin ejecutar comando*/
}/*Fin export*/