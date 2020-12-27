module.exports = {
    name: "removeowner",
    desc: "Remove a bot owner",
    usage: "<user id>",
    execute: async (message, args) => {
        message.delete({timeout: 0});
        
        if (message.author.id !== 'main_owner_id') return message.channel.send('Only `Your Name` can use this command!')
        
        let timestamp = moment().format('LLLL');
        
        let value = args[0]
        
        botowner.on('error', err => console.log(chalk.yellow('[ERROR] ', err)));
        
        let user = await bot.users.fetch(value.toString());
        
        await botowner.delete(value)
        await message.channel.send(`${user.username} removed as Bot Owner`)
       
             let logEmbed = new Discord.MessageEmbed()
        	.setColor(embedColor)
        	.setTitle('Bot Owner Removed')
        	.addField('Owner:', user.username + '#' + user.discriminator)
        	.addField('Removed By:', message.author.tag)
        	.setTimestamp()
        
        let logChan = bot.channels.cache.get(config.botlogs)
        logChan.send(logEmbed)
        
       }}