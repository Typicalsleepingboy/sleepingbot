//       _ _           _                                    
//      | (_)_   _____| |_   _ ___  ___  _   _ _ __ ___ ___ 
//      | | \ \ / / _ \ | | | / __|/ _ \| | | | '__/ __/ _ \
//      | | |\ V /  __/ | |_| \__ \ (_) | |_| | | | (_|  __/
//      |_|_| \_/ \___|_|\__, |typicalsleepingboy/\___\___|.co
//  



console.log("\x1b[41m\x1b[37m%s\x1b[0m", "====================================");
console.log("\x1b[44m\x1b[37m%s\x1b[0m", " this made by |typicalsleepingboy|");
console.log("\x1b[41m\x1b[37m%s\x1b[0m", "====================================");
console.log("\x1b[36m%s\x1b[0m", `Sabar load semua gambar dulu tunggu yaa 😭😭`);


process.env.TZ = "Asia/Jakarta";
const { Client, IntentsBitField, ActivityType, Partials, ChannelType, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { welcomeNewMember, farewellMember } = require('./src/welcome.js');



const os = require('os');
const platform = require('platform');
const discord = require('discord.js');
require('dotenv').config();
require('./handler.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages
  ], partials: [Partials.Channel, Partials.Message]
});


client.ws.setMaxListeners(20);



const linksos = `https://linktr.ee/48intens`;
const typlink = `https://twitter.com/Typicalsleeping`;
const crstlnz = `https://dc.crstlnz.my.id/`;
client.on(Events.MessageCreate, async (message) => {
  if (message.channel.type === ChannelType.DM && !message.author.bot) {
    try {
      const embed = new EmbedBuilder()
        .setColor('#242238')
        .setAuthor({ name: '48Intens Official✧', iconURL: 'https://ucarecdn.com/d64744d4-b4ce-4d39-afd7-9c9ce3795f99/48intens_1_1.png', url: 'https://discord.gg/48intenscommunity' })
        .setTitle('48Intens Official bot Helper ⛑️')
        .setImage('https://ucarecdn.com/7263cdb0-7aa9-4e0f-914e-1751ea511337/intenspink.jpg')
        .setDescription(`**Terima kasih telah menggunakan Discord Bot 48Intest Official Discord Bot. Intinya ini adalah bot notif jeketiFull automated 🤖 \n\n ・ Made by Typicalsleepingboy:\n ${typlink}\n ・ Support data by Crstlnz : ${crstlnz}**`)
        .addFields(
          { name: '・ Follow Sosmed 48Intens Official', value: `${linksos}`, inline: true },
        )
        .setThumbnail('https://ucarecdn.com/7263cdb0-7aa9-4e0f-914e-1751ea511337/intenspink.jpg')
        .setTimestamp()
                  .setFooter({ text: 'By 48Intens Official and Full automated 🤖', iconURL: 'https://cdn.discordapp.com/attachments/1247858377611284561/1247858470657458260/logo_sleeping.jpg?ex=66618e43&is=66603cc3&hm=dba2c431c7a79f4e5c068d7fbec03467462b210fabde7e1213f036c5e93f0328&' });

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Undang bot ini ke server kaliann 🤖')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/oauth2/authorize?client_id=1227190921804906568'),
        );


      await message.channel.send({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error('Failed to send DM:', error);
    }
  }
});


const welcomeChannelId = '1247795471834026067';
const farewellChannelId = '1247795473620799539';



async function updateActivity() {
  try {
    const guild = client.guilds.cache.get('1247795471028846656');
    if (!guild) {
      console.error('Guild not found');
      return;
    }
    const memberCount = guild? guild.memberCount : 'tidak terdeteksi';

    let customStatuses = [
      {
        name: `${memberCount} Users discord💠`,
        type: ActivityType.Watching,
      },
      {
        name: 'Discord Sleeping.stu',
        type: ActivityType.Watching,
      },
      {
        name: `Sayang ellayyyy`,
        type: ActivityType.Listening,
      },
      {
        name: `Monitor bot`,
        type: ActivityType.Watching,
      },
    ];

    client.user.setStatus('idle');

    let random = Math.floor(Math.random() * customStatuses.length);
    client.user.setActivity(customStatuses[random]);
  } catch (error) {
    console.error('Error updating activity:', error);
  }
}

client.on('ready', async () => {
  console.log(`1️⃣  ${client.user.tag} is online`);
  console.log(`2️⃣  ${client.user.id} is successfully registered`);
  console.log(`3️⃣  ${client.guilds.cache.size} servers are logged in`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`discord.js version: ${discord.version}`);
  console.log(`Node.js version: ${process.version}`);
  console.log(`Running on: ${platform.os} ${platform.release} (${os.type})`);

  updateActivity(); // Call updateActivity once

  setInterval(updateActivity, 10000)

    // setInterval(() => { sendNewsMessage(client, channelId); }, delay.update_message);
    // setInterval(() => { sendTheaterEmbed(client, theaterChannelId); }, delay.update_message);
    // setInterval(() => { checkTheaterStart(client, alertChannelId) }, delay.check_theater);
    // setInterval(() => { sendConcertEmbed(client, concertChannelId); }, delay.update_message);
    // setInterval(() => { sendBirthdayEmbed(client, birthdayChannelId); }, delay.update_message);
    // setInterval(() => { sendShowroomEmbed(client, showroomChannelId); }, delay.check_live);
    // setInterval(() => { sendIDNLiveEmbed(client, idnLiveChannelId); }, delay.check_live);
    // setInterval(() => { sendRecentLivesrEmbed(client, recentchannelId); }, delay.check_theater);
    // setInterval(() => { sendRecentLiveidnEmbed(client, recentchannelidnId); }, delay.check_theater);

    // sendNewsMessage(client, channelId);
    // sendTheaterEmbed(client, theaterChannelId);
    // sendConcertEmbed(client, concertChannelId);
    // sendBirthdayEmbed(client, birthdayChannelId);
    // sendShowroomEmbed(client, showroomChannelId);
    // sendIDNLiveEmbed(client, idnLiveChannelId);
    // sendRecentLivesrEmbed(client, recentchannelId);
    // sendRecentLiveidnEmbed(client, recentchannelidnId);
    // checkTheaterStart(client, alertChannelId);
  });

  client.on('guildMemberAdd', member => {
    welcomeNewMember(member, welcomeChannelId);
  });

  client.on('guildMemberRemove', member => {
    farewellMember(member, farewellChannelId);
  });



  client.login(process.env.DISCORD_TOKEN);