import { useState } from 'react';
import { fetchEmotes } from '../../api';

const EmoteFetcher = () => {
  const [channelId, setChannelId] = useState('');
  const [emotes, setEmotes] = useState<any[]>([]);

  const handleFetchEmotes = async () => {
    if (!channelId) {
      console.log('Channel ID field is empty!');
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
        {emotes.map((emote: any) => {
          const isAnimated = emote.format.includes('animated');
          const imageUrl = isAnimated
            ? emote.images.url_2x.replace('static/', 'animated/')
            : emote.images.url_2x;

          return <img key={emote.id} src={imageUrl} alt={emote.name} />;
        })}
      </div>
    </>
  );
};

export default EmoteFetcher;
