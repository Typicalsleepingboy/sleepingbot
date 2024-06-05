// src/ping.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Balasan dengan Pong! dan menampilkan latensi.'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: '🏓・Pong! Berhasil mendapatkan latensi bot.', fetchReply: true });
    const roundTripLatency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.editReply(`🏓・Pong! Berhasil mendapatkan latensi bot.\n・Klien adalah 🔴 ${roundTripLatency}ms dan API adalah 🟡 ${apiLatency}ms`);
  },
};
