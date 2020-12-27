module.exports = {
    name: "addmod",
    desc: "Add a new bot moderator",
    usage: "<user id>",
    execute: async (message, args) => {
        message.delete({timeout: 0});
                
        let noEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
      	.setTitle('404 Forbidden')
      	.setTimestamp()
      
        let admin = await botadmin.get(message.author.id)
        if (!admin) {
            return message.channel.send(noEmbed)
        }
        let timestamp = moment().format('LLLL');
        
        let value = args[0]
        
        botmod.on('error', err => console.log(chalk.yellow('[ERROR] ', err)));
        
        let user = await bot.users.fetch(value.toString());
        
        await botmod.set(value, `Hired: ${timestamp} (EASTERN STANDARD TIME)`)
        await message.channel.send(`${user.username} set as Bot Moderator`)
        
        let logEmbed = new Discord.MessageEmbed()
        	.setColor(embedColor)
        	.setTitle('Bot Moderator Added')
        	.addField('New Moderator:', user.username + '#' + user.discriminator)
        	.addField('Added By:', message.author.tag)
        	.setTimestamp()
        
        let logChan = bot.channels.cache.get(config.botlogs)
        logChan.send(logEmbed)
       }}