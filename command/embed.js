const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embedbuilder')
    .setDescription('Create a custom embed message')
    .addStringOption(option => option.setName('color').setDescription('Set the color of the embed'))
    .addStringOption(option => option.setName('title').setDescription('Set the title of the embed'))
    .addStringOption(option => option.setName('url').setDescription('Set the URL of the embed'))
    .addStringOption(option => option.setName('description').setDescription('Set the description of the embed'))
    .addStringOption(option => option.setName('thumbnail').setDescription('Set the thumbnail URL of the embed'))
    .addStringOption(option => option.setName('image').setDescription('Set the image URL of the embed'))
    .addStringOption(option => option.setName('footer').setDescription('Set the footer text of the embed'))
    .addStringOption(option => option.setName('footericon').setDescription('Set the footer icon URL of the embed'))
    .addStringOption(option => option.setName('field1name').setDescription('Set the name of the first field'))
    .addStringOption(option => option.setName('field1value').setDescription('Set the value of the first field'))
    .addStringOption(option => option.setName('field2name').setDescription('Set the name of the second field'))
    .addStringOption(option => option.setName('field2value').setDescription('Set the value of the second field'))
    .addStringOption(option => option.setName('field3name').setDescription('Set the name of the third field'))
    .addStringOption(option => option.setName('field3value').setDescription('Set the value of the third field'))
    .addStringOption(option => option.setName('field4name').setDescription('Set the name of the fourth field'))
    .addStringOption(option => option.setName('field4value').setDescription('Set the value of the fourth field'))
    .addStringOption(option => option.setName('field5name').setDescription('Set the name of the fifth field'))
    .addStringOption(option => option.setName('field5value').setDescription('Set the value of the fifth field'))
    .addStringOption(option => option.setName('field6name').setDescription('Set the name of the sixth field'))
    .addStringOption(option => option.setName('field6value').setDescription('Set the value of the sixth field'))
    .addBooleanOption(option => option.setName('timestamp').setDescription('Add a timestamp to the embed')),
  
  async execute(interaction) {
    const color = interaction.options.getString('color');
    const title = interaction.options.getString('title');
    const url = interaction.options.getString('url');
    const description = interaction.options.getString('description');
    const thumbnail = interaction.options.getString('thumbnail');
    const image = interaction.options.getString('image');
    const footer = interaction.options.getString('footer');
    const footerIcon = interaction.options.getString('footericon');
    const field1Name = interaction.options.getString('field1name');
    const field1Value = interaction.options.getString('field1value');
    const field2Name = interaction.options.getString('field2name');
    const field2Value = interaction.options.getString('field2value');
    const field3Name = interaction.options.getString('field3name');
    const field3Value = interaction.options.getString('field3value');
    const field4Name = interaction.options.getString('field4name');
    const field4Value = interaction.options.getString('field4value');
    const field5Name = interaction.options.getString('field5name');
    const field5Value = interaction.options.getString('field5value');
    const field6Name = interaction.options.getString('field6name');
    const field6Value = interaction.options.getString('field6value');
    const timestamp = interaction.options.getBoolean('timestamp');

    const embed = new EmbedBuilder();

    if (color) embed.setColor(color);
    if (title) embed.setTitle(title);
    if (url && url !== '') embed.setURL(url);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (image) embed.setImage(image);

    // Add fields to the embed
    const fields = [
      { name: field1Name, value: field1Value },
      { name: field2Name, value: field2Value },
      { name: field3Name, value: field3Value },
      { name: field4Name, value: field4Value },
      { name: field5Name, value: field5Value },
      { name: field6Name, value: field6Value },
    ].filter(field => field.name && field.value);

    fields.forEach(field => {
      embed.addFields({ name: field.name, value: `\`${field.value.split('\\n').join('\n')}\`` });
    });

    if (timestamp) {
      embed.setTimestamp();
    }
    if (footer) {
      embed.setFooter({ text: footer, iconURL: footerIcon || null });
    }

    // Acknowledge the interaction immediately
    await interaction.deferReply();

    // Wait for 3 seconds before sending the actual embed
    setTimeout(async () => {
      await interaction.editReply({ embeds: [embed] });
    }, 3000);
  }
};
