const Discord = require("discord.js");

module.exports = (client, botUtils, message) => {
  newError = botUtils.newError;
  try {
    
    let msg = message.content.replace(/<.+?>/g,'M')
    let size = msg.length
    let spaces = msg.match(/\s/g)
    spaces = spaces && spaces.length/size || 0
    let mentions = message.content.match(/<.+?>/g)
    mentions = mentions && mentions.length || 0

    //qunatidade de urls
    let urls = msg.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
    urls = urls && urls.length || 0

    if(size < 20 && !mentions) return;
    if(

      (size >= 50 && !urls && spaces<0.05) ||
      (urls > 1) ||
      (mentions > 3)

    ) {
      const cLogs = client.channels.cache.get('767982805908324411');
      return cLogs.send({embed: {
        title: "Possivel SPAM",
        author: {
          name: message.author.tag,
		      icon_url: message.author.avatarURL()
        },
        description: message.content
      }});
      message.reply('sua mensagem foi detectado como spam.')
    };

  } catch (err) {
    let IDs = {
      server: message.guild.id,
      user: message.author.id,
      msg: message.id
    }
    console.log(`=> ${newError(err, "ClientMessage_Mudae", IDs)}`);
  }
}