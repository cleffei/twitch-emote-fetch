import { useState } from 'react';
import { fetchEmotes } from '../../api';

const EmoteFetcher = () => {
  const [channelId, setChannelId] = useState('');
  const [emotes, setEmotes] = useState<any[]>([]);

  const handleFetchEmotes = async () => {
    if (!channelId) {
      return;
    } else {
      const emoteInfo = await fetchEmotes(channelId);
      setEmotes(emoteInfo);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Channel ID"
          value={channelId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChannelId(e.target.value)
          }
        />
        <button onClick={handleFetchEmotes}>View Channel's Emotes</button>
      </div>

      <div>
        {emotes.map((emote: any) => (
          <img key={emote.id} src={emote.images.url_2x} />
        ))}
      </div>
    </>
  );
};

export default EmoteFetcher;
