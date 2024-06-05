const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tiktok')
    .setDescription('Unduh video TikTok tanpa watermark')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('The TikTok video URL')
        .setRequired(true)),
  async execute(interaction) {
    try {
      const url = interaction.options.getString('url');

      // Defer the reply to give more time for processing
      await interaction.deferReply();

      const quickvidsUrl = await getQuickvidsUrl(url);

      if (!quickvidsUrl) {
        return interaction.editReply('Failed to retrieve the TikTok video. Please try again later.');
      }

      await interaction.editReply({
        content: `Ini dia video tiktok tanpa watermark by 48Intens Official: ${quickvidsUrl}`,
        ephemeral: false
      });
    } catch (error) {
      console.error('Error executing command tiktok:', error);
      await interaction.editReply('There was an error while executing this command!');
    }
  },
};

async function getQuickvidsUrl(tiktokUrl) {
  try {
    const headers = {
      "content-type": "application/json",
      "user-agent": "Keto 2 - stkc.win",
    };
    const fetch = await import('node-fetch').then(mod => mod.default);
    const apiUrl = "https://api.quickvids.win/v1/shorturl/create";
    const data = { input_text: tiktokUrl };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      timeout: 5000 // Timeout in milliseconds
    });

    if (response.status === 200) {
      const responseData = await response.json();
      const quickvidsUrl = responseData.quickvids_url;
      return quickvidsUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
