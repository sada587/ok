const Discord = require("discord.js");
const client = new Discord.Client();
const database = require("quick.db");
const fs = require("fs");
const conf = require("./botconfig/config.json");
require("./modules/eventLoader.js")(client);
let bot = client.user;

client.on("ready", () => {
    console.log(`[BOT]: Logged in as ${client.user.tag}`)
    client.user.setPresence({ 
        activity: { 
            name: `Yeni ekonomi botu (new economy bot ) Relax bot relax help come to support server for free premium https://discord.com/invite/4HYJnyzyX9`, 
            type: "WATCHİNG"
        }, 
        status: "online"
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/economy", (err, files) => {
  if (err) console.error(err);
  console.log(`[ECONOMY]: ${files.length} command will load.`);
  files.forEach(f => {
    let props = require(`./commands/economy/${f}`);
    console.log(`[ECONOMY]: ${props.config.name} named command loaded.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
});

fs.readdir("./commands/mod", (err, files) => {
    if (err) console.error(err);
    console.log(`[MOD]: ${files.length} command will load.`);
    files.forEach(f => {
      let props = require(`./commands/mod/${f}`);
      console.log(`[MOD]: ${props.config.name} named command loaded.`);
      client.commands.set(props.config.name, props);
      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.config.name);
      });
    });
  });

fs.readdir("./commands/owner", (err, files) => {
    if (err) console.error(err);
    console.log(`[OWNER]: ${files.length} command will load.`);
    files.forEach(f => {
      let props = require(`./commands/owner/${f}`);
      console.log(`[OWNER]: ${props.config.name} named command loaded.`);
      client.commands.set(props.config.name, props);
      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.config.name);
      });
    });
  });

fs.readdir("./commands/utilies", (err, files) => {
    if (err) console.error(err);
    console.log(`[UTILIES]: ${files.length} command will load.`);
    files.forEach(f => {
      let props = require(`./commands/utilies/${f}`);
      console.log(`[UTILIES]: ${props.config.name} named command loaded.`);
      client.commands.set(props.config.name, props);
      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.config.name);
      });
    });
  });

client.on("message", async (message) => {
    let miktar = "1";
    database.add(`msgcount.${message.guild.id}_${message.author.id}`, miktar)
});

client.on("message", async (message) => {
  if(message.content == "relax") {
    message.channel.send(`:no_entry_sign: **${message.author.username}**, use the __relax help__ command!`)
  };
});

client.on("message", async (message) => {
  if(message.content == `<@${client.user.id}>`) {
    message.channel.send(`:no_entry_sign: **${message.author.username}**, use the __relax help__ command!`)
  };
});

client.on("message", async (message) => {
  if(message.content == `<@!${client.user.id}>`) {
    message.channel.send(`:no_entry_sign: **${message.author.username}**, use the __relax help__ command!`)
  };
});

client.on("messageDelete", message => {
  const data = require("quick.db");
  data.set(`snipe.mesaj.${message.guild.id}`, message.content);
  data.set(`snipe.id.${message.guild.id}`, message.author.id);
});

client.on("message", message => {
  const db = require("quick.db");
  let mesajsayi = db.fetch(`msgcount.${message.guild.id}_${message.author.id}`);
    if(mesajsayi == "500") {
    db.add(`usermoney.${message.author.id}`, 50)
    message.channel.send(`:sparkles: **| ${message.author.username}**, congratulations you have reached 500 messages on this server and deserved 50 Relax money. \n Tebrikler bu sunucuda 500 mesaja ulaştınız ve 50 Relax parasını hak ettiniz`);
  };
  if(mesajsayi == "1000") {
    db.add(`usermoney.${message.author.id}`, 100)
    message.channel.send(`:sparkles: **| ${message.author.username}**, congratulations you have reached 1000 messages on this server and deserved 100 Relax money. \n Tebrikler bu sunucuda 1000 mesaja ulaştınız ve 100 Relax Parasını hak ettiniz`);
  };
    if(mesajsayi == "2000") {
    db.add(`usermoney.${message.author.id}`, 250)
    message.channel.send(`:sparkles: **| ${message.author.username}**, congratulations you have reached 2000 messages on this server and deserved 250 Relax money. \n Tebrikler bu sunucuda 2000 mesaja ulaştınız ve 250 Relax Parasını hak ettiniz`);
  };
    if(mesajsayi == "3000") {
    db.add(`usermoney.${message.author.id}`, 400)
    message.channel.send(`:sparkles: **| ${message.author.username}**, congratulations you have reached 3000 messages on this server and deserved 400 Relax money. \n Tebrikler bu sunucuda 3000 mesaja ulaştınız ve 400 Relax Parasını hak ettiniz`);
  };
});

client.on("guildCreate", async (guild, message, role, member) => {
    database.set(`premiume.${guild.id}`, false);
    console.log(`✅ | ${guild.name} (${guild.id}) named server's premium is de-active.`)
});

client.login(conf.token);





client.on("guildCreate", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "863744979964133377" 
const candycode = new Discord.MessageEmbed()
.setTitle(`📥Yeni bir sunucuya eklendim`)
.setColor("GREEN")
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: candycode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})
//candy code
  
//Atıldım
client.on("guildDelete", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "863744979964133377" 
const candycode = new Discord.MessageEmbed()
.setTitle(`📤Bir sunucudan atıldım`)
.setColor("RED")
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: candycode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})

