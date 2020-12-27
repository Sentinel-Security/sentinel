const { idgen } = require('../../Scripts/affrontIDGenerator.js')

module.exports = {
    name: "add",
    desc: "Add a user to the ban list",
    usage: "<user id> <reason> <proof> [notes]",
    execute: async (message, args) => {
    
        let regex = 'Your link regex here'
        
        let noEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
      	.setTitle('403 Forbidden')
      	.setTimestamp()
      
        let bmod = await botmod.get(message.author.id)
        if (!bmod) {
            return message.channel.send(noEmbed)
        }
        
        let type = args[1];
        let who = args[0];
        let proof = args[2];
        let notes = message.content.split(' ').slice(4).join(' ')
        
        if (!who) return message.channel.send('Please provide a valid user ID.').then(m => m.delete({ timeout: 10000}));
        if (!type) return message.channel.send('Please provide a ban reason.').then(m => m.delete({ timeout: 10000}));
        if (!proof) return message.channel.send('Please provide a proof link.').then(m => m.delete({ timeout: 10000}));
        if (!regex.test(proof)) return message.channel.send('Please provide a valid proof link.').then(m => m.delete({ timeout: 10000}));
        
        const user = await bot.users.fetch(who)
                
        let isMod = await botmod.get(user.id)
        let isAdmin = await botadmin.get(user.id)
        let isOwner = await botowner.get(user.id)
        
        if (isMod) return message.channel.send('That user is a Bot Moderator and cannot be added to the banlist!.').then(m => m.delete({ timeout: 10000}));
        if (isAdmin) return message.channel.send('That user is a Bot Admin and cannot be added to the banlist!.').then(m => m.delete({ timeout: 10000}));
        if (isOwner) return message.channel.send('That user is a Bot Owner and cannot be added to the banlist!.').then(m => m.delete({ timeout: 10000}));
        
        if (!notes) {
        	notes = 'None';
        }
        
        let onList = await banDB.get(user.id);
        
        if (onList) return message.channel.send('That user is already on the banlist.')
        
        if (user === null || user === undefined) return message.channel.send('I was unable to locate that user. Please check the user ID.');
        
        let timestamp = moment().format('LLLL');
        let reason = 'null';
        
        if (type === 'nsfw') {
        	reason = 'Sending NSFW content in SFW channels.';
        }
        if (type === 'dmad') {
        	reason = 'DM Advertising Servers/Bots/Social Media.';
        }
        if (type === 'raid') {
        	reason = 'Raiding/Nuking Servers';
        }
        if (type === 'ddos') {
        	reason = 'Harming users via DoS/DoX/DDoS Attacks';
        }      
        if (type === 'harass') {
        	reason = 'Harassing/Threatening Users';
        }
        if (type === 'spam') {
        	reason = 'Spamming in channels/DMs that don\'t allow spam.';
        }
        
        let logChan = bot.channels.cache.get(config.banlogs)
        
        let affront = await idgen(10);
        
        
        let logEmbed = new Discord.MessageEmbed()
        	.setColor(embedColor)
            .setTitle('Ban Added')
            .addField('User:', user.username + '#' + user.discriminator + ' | ' + user.id)
            .addField('Reason:', reason)
            .addField('Proof Link:', `[Click Here](${proof})`, true)
        	.addField('Notes:', notes)
            .addField('Moderator:', message.author.tag)
            .addField('Timestamp:', timestamp)
            
        if (type === 'nsfw') {
        	reason = 'Sending NSFW content in SFW channels.';
            await banDB.set(user.id, reason);
            await proofDB.set(user.id, proof)
            await modDB.set(user.id, message.author.tag)
            await notesDB.set(user.id, notes)
            await timeDB.set(user.id, timestamp)
            await affrontDB.set(user.id, affront)
            await logChan.send(logEmbed)
            await message.channel.send(`${user.username}#${user.discriminator} added to the banlist for ${reason}`)            
        } else
        if (type === 'dmad') {
        	reason = 'DM Advertising Servers/Bots/Social Media.';
            await banDB.set(user.id, reason);
            await proofDB.set(user.id, proof)
            await modDB.set(user.id, message.author.tag)
            await notesDB.set(user.id, notes)
            await timeDB.set(user.id, timestamp)
            await affrontDB.set(user.id, affront)
            await logChan.send(logEmbed)
            await message.channel.send(`${user.username}#${user.discriminator} added to the banlist for ${reason}`)
        } else
        if (type === 'raid') {
        	reason = 'Raiding/Nuking Servers';
            await banDB.set(user.id, reason);
            await proofDB.set(user.id, proof)
            await modDB.set(user.id, message.author.tag)
            await notesDB.set(user.id, notes)
            await timeDB.set(user.id, timestamp)
            await affrontDB.set(user.id, affront)
            await logChan.send(logEmbed)
            await message.channel.send(`${user.username}#${user.discriminator} added to the banlist for ${reason}`)
        } else
        if (type === 'ddos') {
        	reason = 'Harming users via DoS/DoX/DDoS Attacks';
            await banDB.set(user.id, reason);
            await proofDB.set(user.id, proof)
            await modDB.set(user.id, message.author.tag)
            await notesDB.set(user.id, notes)
            await timeDB.set(user.id, timestamp)
            await affrontDB.set(user.id, affront)
            await logChan.send(logEmbed)
            await message.channel.send(`${user.username}#${user.discriminator} added to the banlist for ${reason}`)
        } else
        if (type === 'harass') {
        	reason = 'Harassing/Threatening Users';
            await banDB.set(user.id, reason);
            await proofDB.set(user.id, proof)
            await modDB.set(user.id, message.author.tag)
            await notesDB.set(user.id, notes)
            await timeDB.set(user.id, timestamp)
            await affrontDB.set(user.id, affront)
            await logChan.send(logEmbed)
            await message.channel.send(`${user.username}#${user.discriminator} added to the banlist for ${reason}`)
        } else
        if (type === 'spam') {
        	reason = 'Spamming in channels/DMs that don\'t allow spam.';
            await banDB.set(user.id, reason);
            await proofDB.set(user.id, proof)
            await modDB.set(user.id, message.author.tag)
            await notesDB.set(user.id, notes)
            await timeDB.set(user.id, timestamp)
            await affrontDB.set(user.id, affront)
            await logChan.send(logEmbed)
            await message.channel.send(`${user.username}#${user.discriminator} added to the banlist for ${reason}`)
        } else {
            message.channel.send('An unexpected error was encountered. Please check the information provided and try again.');
        }
        
}}