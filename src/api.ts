import axios from 'axios';

export const fetchEmotesByChannelName = async (channelName: string) => {
  try {
    const response = await axios.get(
      `/api/fetchEmotes?channelName=${channelName}`
    );
    console.log(response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.error('Error occurred fetching emotes\n', error);
    return [];
  }
};
