const mysql = require('mysql');

function modificar_booster(booster, rol){
    const mysql = require('mysql');
    var con = mysql.createConnection({
      host: "db4free.net",
      user: "ozkavosh",
      password: "66a46dd7",
      port: "3306",
      database: "finessedb"
    });

    con.connect(function(err) {
      if (err) throw err;
    });

    con.query(`UPDATE boosters SET estado = 1 WHERE id_us = ${booster} AND rol = "${rol}"`, function(err, result) {
        if (err) throw err;
        console.log("se acepto un booster");
    });
    con.end();
}

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
                case 'dps': partes[8] = `<:dps:884119963571458068>`;  partes[9] = 'DPS';
                        break;
                    case 'heal': partes[8] = `<:heal:884119949776420895>HEAL`; partes[9] = 'HEAL';
                        break;
                    case 'tank': partes[8] = `<:tank:884119949512175647>TANK`; partes[9] = 'TANK';
                        break;
                    case 'chest1': partes[8] = `<:chest1:884474242605908090>FUNNEL`; partes[9] = 'FUNNEL';
                        break;
            }
        }

        modificar_booster(partes[6], partes[9]);

        client.users.fetch(partes[6]).then(usuario => {
            usuario.send(`Fuiste aceptado para el carry ! Tu rol es: ${partes[8]} ${partes[9]}`).catch(console.error);
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