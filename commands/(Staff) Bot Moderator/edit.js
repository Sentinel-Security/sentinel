module.exports = {
    name: "edit",
    desc: "Edit a ban record",
    usage: "<user id> <value to change> <new value>",
    execute: async (message, args) => {
    
        let regex =  'Your Regex Here'
        
        let noEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
      	.setTitle('404 Forbiddne')
      	.setTimestamp()
      
        let bmod = await botmod.get(message.author.id)
        if (!bmod) {
            return message.channel.send(noEmbed)
        }
        
        let who = args[0];
        let type = args[1]
        
        let notes = message.content.split(' ').slice(2).join(' ')
        
        if (!who) return message.channel.send('Please provide a valid user ID.').then(m => m.delete({ timeout: 10000}));
        if (!type) return message.channel.send('Please provide a value to update').then(m => m.delete({ timeout: 10000}));
        
        const user = await bot.users.fetch(who)
        
        let onList = await banDB.get(user.id);
        
        if (!onList) return message.channel.send('That user is not on the banlist.')
        
        if (user === null || user === undefined) return message.channel.send('I was unable to locate that user. Please check the user ID.');
        
            let db1 = await banDB.get(user.id);
            let db2 = await proofDB.get(user.id)
            let db3 = await modDB.get(user.id)
            let db4 = await notesDB.get(user.id)
            let db5 = await timeDB.get(user.id)
            let db6 = await affrontDB.get(user.id)
        
        let logChan = bot.channels.cache.get(config.banlogs)
        let newValue = 'null';
        
             let embed = new Discord.MessageEmbed()
        	.setColor(embedColor)
            .setTitle('Ban Updated')
            .addField('User:', user.username + '#' + user.discriminator + ' | ' + user.id)
            .setTimestamp()
 
        if (type === 'user') {
            
        	newValue = args[2]
            
            embed.addField('Type:', 'User')
            embed.addField('Old Value:', user.id)
            embed.addField('New Value:', newValue)
            embed.addField('Moderator:', message.author.tag)
            
            let ban = await banDB.get(user.id);
            let proof = await proofDB.get(user.id)
            let mod = await modDB.get(user.id)
            let notes = await notesDB.get(user.id)
            let time = await timeDB.get(user.id)
            let affront = await affrontDB.get(user.id)
            
            await banDB.set(newValue, ban)
            await proofDB.set(newValue, proof)
            await modDB.set(newValue, mod)
            await notesDB.set(newValue, notes)
            await timeDB.set(newValue, time)
            await affrontDB.set(newValue, affront)
            
            await banDB.delete(user.id)
            await proofDB.delete(user.id)
            await modDB.delete(user.id)
            await notesDB.delete(user.id)
            await timeDB.delete(user.id)
            await affrontDB.delete(user.id)  
            
            await logChan.send(embed)
            await message.channel.send('Ban Updated.')
        } else
        if (type === 'proof') {
            newValue = args[2]
            if (!regex.test(newValue)) return message.channel.send('Please provide a valid proof link. (Use approved CDN)').then(m => m.delete({ timeout: 10000}));
            
            let proof = await proofDB.get(user.id)
            
            embed.addField('Type:', 'Proof')
            embed.addField('Old Value:', proof)
            embed.addField('New Value:', newValue)
            embed.addField('Moderator:', message.author.tag)
            
            await proofDB.set(user.id, newValue)
            await logChan.send(embed)
            await message.channel.send('Ban Updated.')
        } else
      	if (type === 'notes') {
            newValue = message.content.split(' ').slice(3).join(' ')
            let notes = await notesDB.get(user.id)
            
            embed.addField('Type:', 'Notes')
            embed.addField('Old Value:', notes)
            embed.addField('New Value:', newValue)
            embed.addField('Moderator:', message.author.tag)
            await logChan.send(embed)
            
            await notesDB.set(user.id, newValue)
            await message.channel.send('Ban Updated.')
        } else {
        message.channel.send('Unexpected error encountered, please check your provided information and try again.')
        }
}}