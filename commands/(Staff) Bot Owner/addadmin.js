module.exports = {
    name: "addadmin",
    desc: "Add a new bot admin",
    usage: "<user id>",
    execute: async (message, args) => {
        message.delete({timeout: 0});
        
        let noEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
      	.setTitle('403 Forbidden')
      	.setTimestamp()
      
        let owner = await botowner.get(message.author.id)
        if (!owner) {
            return message.channel.send(noEmbed)
        }
        
        let timestamp = moment().format('LLLL');
        
        let value = args[0]
        
        botadmin.on('error', err => console.log(chalk.yellow('[ERROR] ', err)));
        
        let user = await bot.users.fetch(value.toString());
        
        await botadmin.set(value, `Hired: ${timestamp} (EASTERN STANDARD TIME)`)
        await message.channel.send(`${user.username} set as Bot Admin`)
        
        let logEmbed = new Discord.MessageEmbed()
        	.setColor(embedColor)
        	.setTitle('Bot Admin Added')
        	.addField('New Admin:', user.username + '#' + user.discriminator)
        	.addField('Added By:', message.author.tag)
        	.setTimestamp()
        
        let logChan = bot.channels.cache.get(config.botlogs)
        logChan.send(logEmbed)
       }}