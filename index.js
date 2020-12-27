const { Client } = require('discord.js');
global.Discord = require('discord.js')
global.Intents = require('discord.js');
global.bot = new Client({ ws: { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"] } });
global.moment = require('moment');
global.fs = require('fs');
global.ms = require('ms');
global.request = require('request');
global.chalk = require('chalk');
global.config = require('./config.json');
global.result = require('./config.json');
global.client = new Discord.Client();
global.Keyv = require('keyv');
global.fetch = require('node-fetch')

// Main Databases -------------------------------------------------

// Define your databases here

// ---------------------------------------------------------------
exports.bot = bot;
bot.commands = new Discord.Collection();
bot.on('error', console.error);

fs.readdir("./events/", (err, files) => {
    if (err) return console.log(chalk.yellow('[ERROR]') + err)
    files.forEach(file => {
        require(`./events/${file}`);
    });
});

// Uncomment for Debugging
/* bot
  .on("debug", console.log)
  .on("warn", console.log)
  */

bot.on('message', async message => {
    let colour = // Define your global color or the location to find it
    global.embedColor = colour
})

bot.on('ready', async () => {
console.log(chalk.red('[SYSTEM] ') + chalk.green('Version: ') + chalk.blue(config.version))
    console.log(chalk.red('[SYSTEM] ') + chalk.green('Prefix: ') + chalk.blue(config.prefix))
    	console.log(chalk.red('[SYSTEM] ') + chalk.green('Guilds: ') + chalk.blue(bot.guilds.cache.size))
    		console.log(chalk.red('[SYSTEM] ') + chalk.green('Users: ') + chalk.blue(bot.users.cache.size))
    			console.log(chalk.red('[SYSTEM] ') + chalk.green('Bot Name: ') + chalk.blue(bot.user.tag))
})

bot.on('ready', async () => {
let setStatus = setInterval(function () {
          const prefix = config.prefix;
    	  const version = config.version;
          var names = [`${prefix}help`, `v${version}`];
          var game = names[Math.floor(Math.random() * names.length)];
         bot.user.setActivity(game,{type: "WATCHING" });
       }, 30000);
    setTimeout(() => {
        try {
            console.log(chalk.red('[STATUS] ') + (chalk.green("Loading Commands...")));
            var cnumber = 0;
            let comands = [];
            const commandFiles = fs.readdirSync("./commands");
            commandFiles.forEach((folder) => {
                const cate = fs.readdirSync(`./commands/${folder}`);
                comands += chalk.red(`\n${folder}  `);
                cate.forEach((file) => {
                    cnumber++;
                    const command = require(`./commands/${folder}/${file}`);
                    comands += chalk.cyan(`${command.name} || `);
                    bot.commands.set(command.name, command);
                });
            });
            console.log(`Successfully Loaded ${chalk.blue(cnumber)} Commands!\n` + comands);
        } catch (e) {
            console.log(chalk.red(`${e.stack}`));
        }
    }, 500);
});

bot.on("ready", () => {
    fs.readdir("./API", (err, names) => {
        names.forEach(name => require(`./API/${name}`));
    })
})

bot.on("message", async (message) => {
    if (message.channel.type == "dm") return;
    let prefix = config.prefix;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(message.content.startsWith(prefix)).split(/ +/);
    const command = args.shift();
    let cmd = bot.commands.get(command.toLowerCase());
    
    if (cmd) {

        			cmd.execute(message, args);
    }
})

bot.login(config.token)
