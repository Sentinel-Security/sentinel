module.exports = {
  name: "log",
  desc: "Setup your logging channel",
  usage: "<channel>",
  execute: async (message, args) => {
    message.delete({ timeout: 0});
  
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permission to use this command! `MANAGE_CHANNELS`')
        
        var text = message.content.split(' ').slice(1).join(' ')
        
        text = text.replace('<', "")   
        text = text.replace('!', '')
        text = text.replace('#', '')
        text = text.replace('>', '')
    
        const setID = await text.toString();
        
        if (!text) return message.channel.send('Please provide a channel ID or mention a channel.')
        
        let chan = bot.channels.cache.get(setID)
        if (chan === undefined || chan === null) return message.channel.send('That is not a valid channel.');
        
        await configDB.set(`${message.guild.id}.logchan`, setID)
        await message.channel.send(`Log channel set as <#${setID}>`)
}};