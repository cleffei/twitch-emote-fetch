import axios from 'axios';

export const fetchEmotesByChannelName = async (channelName: string) => {
  try {
    const response = await axios.get(
      `https://twitch-emote-fetcher.netlify.app/.netlify/functions/fetchEmotes?channelName=${channelName}`
    );
    console.log(response);
    return response.data.emotes || [];
  } catch (error) {
    console.error('Error occurred fetching emotes\n', error);
    return [];
  }
};
