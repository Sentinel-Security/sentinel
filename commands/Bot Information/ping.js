module.exports = {
  name: "ping",
  desc: "Check the bot's ping time",
  usage: "",
  execute: async (message, args) => {
      message.delete({timeout: 0})

  const Discord = require('discord.js')
  const client = new Discord.Client();

      const awaitEmbed = new Discord.MessageEmbed()
          .setColor(embedColor)
          .setDescription(`Calculating . . .`)
          .setFooter(bot.user.username, bot.user.avatarURL({ format: 'png', dynamic: true }))
      
      const m = await message.channel.send(awaitEmbed);

      const pingEmbed = new Discord.MessageEmbed()
          .setColor('#00FF00')
          .addField('Ping', message.client.ws.ping + 'ms', true)
          .addField('Heartbeat', Date.now() - message.createdTimestamp + 'ms', true)
          .setFooter(bot.user.username, bot.user.avatarURL({ format: 'png', dynamic: true }));

      m.edit(pingEmbed);
  }}