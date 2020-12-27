bot.on('message', async message => {

    let regex = /^[\s\w\d\?><;,\{\}\[\]\-_\+=!@\#\$%^&\*\|\'\(\)\"\`\~\\\.\:]*$/

    let floodToggle = await togglesDB.get(`${message.guild.id}.antispam`)

    if (floodToggle === 'ON') {
        if (message.author.bot) return;
        if (message.member.hasPermission('MANAGE_MESSAGES')) return;
        
        let flood = await anti_spam.get(`${message.author.id}.${message.guild.id}`)

        if (regex.test(message.content)) {
            if (flood) {
                message.delete()
                await message.reply('Slow down!').then(m => m.delete({
                    timeout: 1000
                }))
                await anti_spam.set(`${message.author.id}.${message.guild.id}`, 'Expires in 1 Second', 1000)
            }

            if (!flood) {
                await anti_spam.set(`${message.author.id}.${message.guild.id}`, 'Expires in 1 Second', 1000)
            }
            if (floodToggle === 'OFF' || floodToggle === undefined) {
                return;
            }
        }
    }
})
