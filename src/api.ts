import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.CLIENT_ID || '';
const accessToken = process.env.ACCESS_TOKEN || '';

export const fetchEmotes = async (channelId: string) => {
  try {
    const response = await axios.get(
      `https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${channelId}`,
      {
        headers: {
          'Client-Id': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error occurred fetching emotes\n', error);
    return [];
  }
};
