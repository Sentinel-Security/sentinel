module.exports = {
    name: "remove",
    desc: "Remove a user from the watchlist",
    usage: "<user id> <reason>",
    execute: async (message, args) => {
    
        let noEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
      	.setTitle('403 Forbidden')
      	.setTimestamp()
      
        let bmod = await botmod.get(message.author.id)
        if (!bmod) {
            return message.channel.send(noEmbed)
        }
        
        let who = args[0];
        let reason = message.content.split(' ').slice(2).join(' ')
        
        if (!who) return message.channel.send('Please provide a valid user ID.').then(m => m.delete({ timeout: 10000}));
        if (!reason) return message.channel.send('Please provide a ban removal reason.').then(m => m.delete({ timeout: 10000}));
        
        const user = await bot.users.fetch(who)
        
        let onList = await banDB.get(user.id);
        
        if (!onList) return message.channel.send('That user is not on the banlist.')
        
        if (user === null || user === undefined) return message.channel.send('I was unable to locate that user. Please check the user ID.');
        
        
        let logEmbed = new Discord.MessageEmbed()
        	.setColor(embedColor)
            .setTitle('Ban Removed')
            .addField('User:', user.username + '#' + user.discriminator + ' | ' + user.id)
            .addField('Reason:', reason)
            .addField('Moderator:', message.author.tag)
            
            await banDB.delete(user.id);
            await proofDB.delete(user.id)
            await modDB.delete(user.id)
            await notesDB.delete(user.id)
            await timeDB.delete(user.id)
        	await affrontDB.delete(user.id)
            
            let logChan = bot.channels.cache.get(config.banlogs)
            
            await logChan.send(logEmbed)
       		await message.channel.send(`${user.username}#${user.discriminator} removed from the banlist.`)
}}