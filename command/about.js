const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydney',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South',
    indonesia: 'Indonesia' // Tambahkan region Indonesia
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Display information about the server'),
    async execute(interaction) {
        try {
            const guild = interaction.guild;

            const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const members = guild.members.cache;
            const channels = guild.channels.cache;
            const emojis = guild.emojis.cache;

            const embed = new EmbedBuilder()
                .setAuthor({ name: '48Intens Official✧', iconURL: 'https://ucarecdn.com/d64744d4-b4ce-4d39-afd7-9c9ce3795f99/48intens_1_1.png', url: 'https://discord.gg/48intenscommunity' })
                .setDescription(`## Server Info ${guild.name}`)
                .setColor('#242238')
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addFields(
                    { name: '⭐ General', value: [
                        `\`Name:\` ${guild.name}`,
                        `\`ID:\` ${guild.id}`,
                        `\`Owner:\` ${guild.owner ? guild.owner.user.tag : 'Not Available'} (${guild.ownerID || 'Not Available'})`,
                        `\`Region:\` ${regions[guild.region] || 'Unknown'}`, // Gunakan region Indonesia jika ada, jika tidak, gunakan 'Unknown'
                        `\`Boost Tier:\` ${guild.premiumTier ? `Tier ${guild.premiumTier}` : 'None'}`,
                        `\`Explicit Filter:\` ${filterLevels[guild.explicitContentFilter]}`,
                        `\`Verification Level:\` ${verificationLevels[guild.verificationLevel]}`,
                        `\`Time Created:\` ${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} [${moment(guild.createdTimestamp).fromNow()}]`,
                        '\u200b'
                    ].join('\n'), inline: false },
                    { name: '⭐ Statistics', value: [
                        `\`Role Count:\` ${roles.length}`,
                        `\`Emoji Count:\` ${emojis.size}`,
                        `\`Regular Emoji Count:\` ${emojis.filter(emoji => !emoji.animated).size}`,
                        `\`Animated Emoji Count:\` ${emojis.filter(emoji => emoji.animated).size}`,
                        `\`Member Count:\` ${guild.memberCount}`,
                        `\`Humans:\` ${members.filter(member => !member.user.bot).size}`,
                        `\`Bots:\` ${members.filter(member => member.user.bot).size}`,
                        `\`Text Channels:\` ${channels.filter(channel => channel.type === 'text').size}`,
                        `\`Voice Channels:\` ${channels.filter(channel => channel.type === 'voice').size}`,
                        `\`Boost Count:\` ${guild.premiumSubscriptionCount || '0'}`,
                        '\u200b'
                    ].join('\n'), inline: false },
                    { name: '⭐ Presence', value: [
                      `\`Online:\` ${members.filter(member => member.presence?.status === 'online').size}`,
                      `\`Idle:\` ${members.filter(member => member.presence?.status === 'idle').size}`,
                      `\`Do Not Disturb:\` ${members.filter(member => member.presence?.status === 'dnd').size}`,
                      `\`Offline:\` ${members.filter(member => member.presence?.status === 'offline').size}`
                  ].join('\n'), inline: false },

                    { name: `Roles [${roles.length - 1}]`, value: roles.join(', ').slice(0, 1024), inline: true }
                )
                .setImage('https://ucarecdn.com/7263cdb0-7aa9-4e0f-914e-1751ea511337/intenspink.jpg')
                .setFooter({ text: 'By 48Intens Official and Full automated 🤖', iconURL: 'https://cdn.discordapp.com/attachments/1247858377611284561/1247858470657458260/logo_sleeping.jpg?ex=66618e43&is=66603cc3&hm=dba2c431c7a79f4e5c068d7fbec03467462b210fabde7e1213f036c5e93f0328&' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('An error occurred while executing the command:', error);
            return interaction.reply({ content: 'An error occurred while executing the command. Please try again later.', ephemeral: true });
        }
    },
};
