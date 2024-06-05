// bitly-api.js
const axios = require('axios');

class BitlyApi {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async shortenUrl(longUrl) {
    try {
      const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
        long_url: longUrl
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.link;
    } catch (error) {
      throw new Error(`Error shortening URL: ${error.message}`);
    }
  }
}

module.exports = BitlyApi;