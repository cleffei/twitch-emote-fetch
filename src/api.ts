import axios from 'axios';

const clientId = import.meta.env.VITE_CLIENT_ID;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const fetchUserId = async (channelName: string) => {
  try {
    const response = await axios.get(
      `https://api.twitch.tv/helix/users?login=${channelName}`,
      {
        headers: {
          'Client-Id': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.data.length === 0) {
      return null;
    } else {
      return response.data.data[0].id;
    }
  } catch (error) {
    console.error('Error occurred fetching channel ID\n', error);
    return null;
  }
};

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
      return null;
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.error('Error occurred fetching emotes\n', error);
    return [];
  }
};

export const fetchEmotesByChannelName = async (channelName: string) => {
  const userId = await fetchUserId(channelName);
  if (!userId) {
    return null;
  } else {
    return fetchEmotes(userId);
  }
};
