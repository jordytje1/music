const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(new Date() + " Ping Received");
  response.sendStatus(400);
});
app.listen(3000);
setInterval(() => {
  http.get(`http://sugared-paste.glitch.me/`);
}, 280000);
 
const setupCMD = "!setreactionrole"
let initialMessage = `**✅Verify✅**`;
const roles = ["『👦』『member』"];
const reactions = ["✅"];


//Load up the bot...
const Discord = require('discord.js');
const bot = new Discord.Client();
 
bot.once('ready', () => {
    console.log(`Your bot is ready (Tutorial by me`);
});
 
//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";
 
//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`**React below to get the **"${role}"** role!**`); //DONT CHANGE THIS); //DONT CHANGE THIS
    return messages;
}
 
 
bot.on("message", message => {
    if (message.member.hasPermission("ADMINISTRATOR") && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                }
            });
        }
    }
})
 
 
bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
       
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
       
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
       
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
               
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj);
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }  
});


const {Client, RichEmbed, Attachment } = require("discord.js");
const client = new Client({disableEveryone: true});

client.on("ready", () => {

  console.log(`Logged in as ${client.user.username}!`);


});

client.on('guildMemberAdd', member => {
  try {
    let embed = new RichEmbed()
   .setTitle("Welcome To the gaming community")
   .addField("Name:", member.user)
   .addField("User ID:", member.id)
   .addField("Member Count:", member.guild.memberCount)
   .setFooter(member.guild.name)
   .setTimestamp(member.guild.createdAt)
   .setColor("#15f153");

  member.guild.channels.get('685534461793665121').send(embed); 
  } catch (err) {
    console.log(err)
  }
});

client.on("guildMemberRemove", member => {
  try {
  let embed = new RichEmbed()
   .setTitle("Thanks for staying with game community")
   .addField("Name:", member.user)
   .addField("User ID:", member.id)
   .addField("Member Count:", member.guild.memberCount)
   .setThumbnail(client.user.displayAvatarURL())
   .setFooter(member.guild.name)
   .setTimestamp(member.guild.createdAt)
   .setColor("#ff0000");

  member.guild.channels.get('685534461793665121').send(embed); 
  } catch (err) {
    console.log(err)
  }
});

client.on("message", async message => {
    
    let prefix = "$";

const args = message.content.slice(prefix.length).trim().split(/\s+/g);

const command = args.shift().toLowerCase();
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    

if(command === 'ping') {

message.channel.send(`Hoold on!`).then(m => {

    m.edit(`🏓  ::  **Pong!** (Roundtrip took: **` + (m.createdTimestamp - message.createdTimestamp) + `ms.** Heartbeat: **` + Math.round(client.ping) + `ms.**)`);

    });

 }

});



bot.login(process.env.TOKEN);
