const fs = require('fs');
var listas = require('../../listas.js');

module.exports = (Discord, client) => {
    console.log('Bot iniciado correctamente!');
    console.log(`Logeado como: ${client.user.tag}`);
    client.user.setActivity('probar weas', {
		type: 'PLAYING'
	});

  fs.readFile('carrys.json',function(err,content){
  if(err) throw err;
  listas.carrys = JSON.parse(content);
  });
}
    
