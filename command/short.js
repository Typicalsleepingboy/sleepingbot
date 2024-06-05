// short-command.js
const { SlashCommandBuilder } = require('discord.js');
const BitlyApi = require('./bitly.js');

const accessToken = '769d38c118fa9bb6e143ae13cf4435be627f2904';
const bitlyApi = new BitlyApi(accessToken);

module.exports = {
  name: 'short',
  data: new SlashCommandBuilder()
    .setName('short')
    .setDescription('Memperpendek URL.')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('URL yang ingin dipendekkan.')
        .setRequired(true)),

  async execute(interaction) {
    try {
      const longUrl = interaction.options.getString('url');
      const shortenedUrl = await bitlyApi.shortenUrl(longUrl);
      if (shortenedUrl) {
        await interaction.reply(`URL pendek: ${shortenedUrl}`); 
      } else {
        await interaction.reply('Maaf, gagal memperpendek URL.'); 
      }
    } catch (error) {
      console.error('Failed to handle slash command:', error);
      await interaction.reply('Terjadi kesalahan saat memproses perintah.');
    }
  },
};