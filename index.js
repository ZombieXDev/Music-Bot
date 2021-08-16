const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello Express app!');
});

app.listen(3000, () => {
	console.log('\033[32m server started');
});

const Discord = require('discord.js');
const client = new Discord.Client();
 
const distube = require('distube');
client.distube = new distube(client, {
	searchSongs: false,
	emitNewSongOnly: true, 
	youtubeDL: true,
    updateYouTubeDL: true,
});
require("@discordjs/opus");
require("ffmpeg-static");
require("ytdl-core");

//////////////////
const prefix = "Your Prefix"
/////////////////


client.on("ready", () => {
 console.log(`${client.user.tag} is ready`)
 client.user.setActivity({ type: "PLAYING", name: `${prefix}help | ZombieX Music` })
}) 

client.on("message", message =>{
if(message.content === prefix + "help"){
const embed = new Discord.MessageEmbed()
.setTitle("Commands :")
.setColor("BLUE")
.setThumbnail(client.user.avatarURL())
.addField(`\`${prefix}play\``, "To Playing Song",true)
.addField(`\`${prefix}stop / st\``, "To Stoping Song",true)
.addField(`\`${prefix}skip\``, "To Skiping Song",true)
.addField(`\`${prefix}pause\``, "To Paused Song",true)
.addField(`\`${prefix}resume\``, "To Resumed Song",true)
.addField(`\`${prefix}queue / q\``, "To View Queue Song",true)
.addField(`\`${prefix}np\``, "To View Now Playing",true)
.addField(`\`${prefix}repeat / loop\``, "To Change Repeat Mode (off, song, queue)",true)

.setFooter(`Request By ${message.author.tag}`)
message.channel.send(embed)
}
if (message.content.startsWith(prefix + "play")) {
		const args = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if(!args) return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Type Song Name or URL`)
			
			); 
		if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			);
		try {
		client.distube.play(message, args);
		
       
		}catch (e) {
const embed = new Discord.MessageEmbed()
.setTitle("❌ Error")
.setColor("RED")
.setDescription(e)
message.channel.send(embed)
  } 
	}
	if (message.content === prefix +"stop" || message.content.startsWith(prefix + "st")) {
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("BLUE")
     .setDescription(`Please Join Voice Channel`)
			
			); 
	const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!")) 
		client.distube.stop(message);
const embed = new Discord.MessageEmbed()
.setTitle("⏸️  Stop")
.setColor("RED")
.setDescription(`The song has been successfully Stoped`)
message.channel.send(embed) 
	}
	if (message.content === prefix +"skip") {
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			);
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!")) 
try {
		client.distube.skip(message);
const embed = new Discord.MessageEmbed()
.setTitle("⏭️  Skip")
.setColor("BLUE")
.setDescription(`The song has been successfully Skiped`)
message.channel.send(embed) 
}catch (e) {
const embed = new Discord.MessageEmbed()
.setTitle("❌ Error")
.setColor("RED")
.setDescription(e)
message.channel.send(embed)
        }
	}
	if (message.content === prefix +"repeat" || message.content.startsWith(prefix + "loop")) {
const args = message.content.split(" ")
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			); 
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing playing!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = client.distube.setRepeatMode(message, mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
const embed = new Discord.MessageEmbed()
.setTitle("🔄  Repeat")
.setColor("RED")
.setDescription(`Set Repeat Mode To \`${mode}\``)
message.channel.send(embed) 
	}
	if (message.content === prefix +"queue" || message.content.startsWith(prefix + "q")) {
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			); 
		let queue = client.distube.getQueue(message);
		if(!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!"))
		const embed = new Discord.MessageEmbed()
		.setTitle("Current Queue :")
	.setColor("BLUE")
	.setDescription(queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n") )
		message.channel.send(embed)
        
	}
	if (message.content === prefix +"np"){
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			); 
		let queue = client.distube.getQueue(message);
		if(!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!"))
		const embed = new Discord.MessageEmbed()
		.setTitle(" Now Playing:")
	.setColor("BLUE")
	.setDescription(queue.songs.map((song, id) =>
            `${song.name} - \`${song.formattedDuration}\``
        ).slice(0,1).join("\n") )
		message.channel.send(embed)
        
	}
	if (message.content === prefix +"volume" || message.content.startsWith(prefix + "vol")) {
const args = message.content.split(" ")
if(!args) return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Type Number To Set Volume`)
			); 
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.seTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			); 
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!"))
  const volume = parseInt(args[1])
if (isNaN(volume)) return message.channel.send(` Please enter a valid number!`)
if(volume > 100) return message.channel.send(new Discord.MessageEmbed()
.setTitle("❌  Error")
.setColor("RED")
.setDescription(`The Max Volume is \`100\``)
)
        client.distube.setVolume(message, volume)
const embed = new Discord.MessageEmbed()
.setTitle("🔊  Volume")
.setColor("RED")
.setDescription(`Volume set to \`${volume}\``)
message.channel.send(embed) 
	}
	if (message.content === prefix +"pause") {
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.seTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			); 
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!"))
if (queue.pause) {
            client.distube.resume(message)
            return message.channel.send(new Discord.MessageEmbed()
.setTitle("▶️  Resumed")
.setColor("RED")
.setDescription(`Resumed the song for you`)
) 
            
        }
        client.distube.pause(message)
const embed = new Discord.MessageEmbed()
.setTitle("⏸️  Paused")
.setColor("RED")
.setDescription(`Paused the song for you`)
message.channel.send(embed) 
	}
	if (message.content === prefix +"resume") {
if (!message.member.voice.channel)
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("❌  Error")
			.setColor("RED")
     .setDescription(`Please Join Voice Channel`)
			
			);
const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(new Discord.MessageEmbed()
		.setTitle("❌ Error")
		.setColor("RED")
		.setDescription("There is nothing in the queue right now!")) 
client.distube.resume(message)
const embed = new Discord.MessageEmbed()
.setTitle("▶️  Resumed")
.setColor("RED")
.setDescription(`Resumed the song for you`)
message.channel.send(embed) 

	}
    
});
const status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter ||
		'Off'}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode == 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

client.distube
.on("finish", message => message.guild.me.voice.channel.leave() )
.on("empty", message => message.guild.me.voice.channel.leave())

.on("initQueue", queue => {
  queue.autoplay = false;
  queue.volume = 100;
})
.on("noRelated", message => message.channel.send("Can't find related video to play. Stop playing music."))

	.on('playSong', (message, queue, song) =>
		message.channel.send({
			embed: {
  color: 0x0099ff,
	title: song.name,
	url: song.url,
				image: {
					url: song.thumbnail
				}, 
				fields: [
				 {
						name: '🕘 Time',
						value: `\`${song.formattedDuration}\``,
						inline: true
					},
					{
						name: '👁️ Views Video',
						value: `\`${song.views}\``,
						inline: true
					},
					{
						name: '👍 Likes Video',
						value: `\`${song.likes}\``,
						inline: true
					},
					{
						name: "👎 Dislikes Video",
						value: `\`${song.dislikes}\``,
						inline: true
					}
				],
	timestamp: new Date(),
	footer: {
		text: `Request By ${song.user.username}`
	}
			}
		})
		
	)
	.on('addSong', (message, queue, song) =>		message.channel.send({
			embed: {
  color: 0x0099ff,
	title: song.name,
	url: song.url,
				image: {
					url: song.thumbnail
				}, 
				fields: [
				 {
						name: '🕘 Time',
						value: `\`${song.formattedDuration}\``,
						inline: true
					},
					{
						name: '👁️ Views Video',
						value: `\`${song.views}\``,
						inline: true
					},
					{
						name: '👍 Likes Video',
						value: `\`${song.likes}\``,
						inline: true
					},
					{
						name: "👎 Dislikes Video",
						value: `\`${song.dislikes}\``,
						inline: true
					}
				],
	timestamp: new Date(),
	footer: {
		text: `Request By ${song.user.username}`
	}
			}
		})
		
	)
	.on("playList", (message, queue, playlist, song) => 
	
	message.channel.send({embed :{
	color: 0x0099ff,
	title:playlist.name,
	url:playlist.url, 
	fields: [
		{
			name: '📃 Playlist Songs',
			value: playlist.songs.length,
		},
		{
		  name:"▶️ Now Playing", 
		  value:`${song.name} \`${song.formattedDuration}\``
		},  
], 
	image:{
	  url:playlist.thumbnail.url, 
	}, 
	timestamp: new Date(),
	footer: {
		text: `Request By ${message.author.tag}`
	},
	}})
	
	
	) 
 	.on("addList", (message, queue, playlist, song) => 
	
	message.channel.send({embed :{
	color: 0x0099ff,
	title:playlist.name,
	url:playlist.url, 
	fields: [
		{
			name: '📃 Playlist Songs',
			value: playlist.songs.length,
		},
		
], 
	image:{
	  url:playlist.thumbnail.url, 
	}, 
	timestamp: new Date(),
	footer: {
		text: `Request By ${message.author.tag}`
	},
	}})
) 

	.on('error', (message, e) => {
		console.error(e);
		message.channel.send('An error encountered: ' + e);
	});

client.login(process.env.token).catch((err) =>{
console.warn("\033[31m Token Invalid")
})
 
