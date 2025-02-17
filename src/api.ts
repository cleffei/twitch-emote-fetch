import axios from 'axios';

const clientId = import.meta.env.VITE_CLIENT_ID;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

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
    if (response.data.data.length === 0) {
      console.log('This channel ID has no emotes!');
      return null;
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error occurred fetching emotes\n', error);
    return [];
  }
};
