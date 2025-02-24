import axios from 'axios';
import { Handler } from '@netlify/functions';

const clientId = process.env.TWITCH_CLIENT_ID;
const accessToken = process.env.TWITCH_ACCESS_TOKEN;

const fetchUserId = async (channelName: string) => {
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

const fetchEmotes = async (channelId: string) => {
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

const handler: Handler = async (event, context) => {
  const channelName = event.queryStringParameters?.channelName;
  if (!channelName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Channel name is required' }),
    };
  }

  const userId = await fetchUserId(channelName);
  if (!userId) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Channel not found' }),
    };
  }

  const emotes = await fetchEmotes(userId);
  if (emotes === null || emotes.length === 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ emotes: [] }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ emotes }),
  };

export { handler };
