module.exports = {
  name: "version",
  desc: "See the current version of the bot",
  usage: "",
  execute: (message, args) => {
    message.delete({ timeout: 0});
  
  const vEmbed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle('Version')
    .setDescription(`v${config.version}`)
    .setTimestamp();
    
    message.channel.send(vEmbed);
}};