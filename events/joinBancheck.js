bot.on('guildMemberAdd', async member => {

    let colour = await botConfig.get('colour')
    let logToggle = await togglesDB.get(`${member.guild.id}.logging`)
    let autobanToggle = await togglesDB.get(`${member.guild.id}.autoban`)

        await fetch(`https://api.sentinel.llc/bans/${member.id}`)
		.then(res => res.json())
		.then(async data => {

            let log = await configDB.get(`${member.guild.id}.logchan`)
            if (!log || log === undefined) return;
            let logChan = await bot.channels.cache.get(log)

            if (logToggle === 'ON') {

                let notBanned = new Discord.MessageEmbed()
                    .setColor(colour)
                    .setTitle('Sentinel Bans')
                    .addField('User:', member.user.username + '#' + member.user.discriminator + ' | ' + member.id)
                    .addField('Status:', 'Not Banned')
                    .setTimestamp()

                if (data.banned === false) return logChan.send(notBanned)

                let isBanned = new Discord.MessageEmbed()
                    .setColor(colour)
                    .setTitle('Sentinel Bans')
                    .addField('User:', member.user.username + '#' + member.user.discriminator + ' | ' + member.id)
                    .addField('Status:', 'Banned')
                    .setFooter(`For Full Information: s?bancheck ${member.id}`)
                    .setTimestamp()

                if (data.banned === true) logChan.send(isBanned)
            }
            if (autobanToggle === 'ON') {
                if (data.banned === true) {
                    let banID = data.affront
                    if (data.affront === undefined) {
                        banID = '0'
                    }
                    let embed = new Discord.MessageEmbed()
                        .setColor(colour)
                        .setTitle('Sentinel Autoban')
                        .addField('User:', member.user.username + '#' + member.user.discriminator + ' | ' + member.id)
                        .addField('Status:', 'Banned')
                        .addField('Mod Notes:', `Autobanned due to Affront \`${banID}\``)
                        .setTimestamp()

                    await member.guild.members.ban(member, {
                        reason: `Autobanned due to Affront:  ${banID}`
                    })
                    await logChan.send(embed)
                }
            }

        });
});