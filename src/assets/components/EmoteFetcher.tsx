import { useState } from 'react';
import { fetchEmotes } from '../../api';

const EmoteFetcher = () => {
  const [channelId, setChannelId] = useState('');
  const [emotes, setEmotes] = useState<any[]>([]);
  const [size, setSize] = useState('2x');

  const handleFetchEmotes = async () => {
    if (!channelId) {
      console.log('Channel ID field is empty!');
      return;
    } else {
      const emoteInfo = await fetchEmotes(channelId);
      if (emoteInfo) {
        setEmotes(emoteInfo);
      } else {
        return null;
      }
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
        <input
          type="radio"
          id="1xBtn"
          name="size"
          value="1x"
          checked={size === '1x'}
          onChange={(e) => setSize(e.target.value)}
        />
        <label htmlFor="1xBtn">1x Size</label>
        <input
          type="radio"
          id="2xBtn"
          name="size"
          value="2x"
          checked={size === '2x'}
          onChange={(e) => setSize(e.target.value)}
        />
        <label htmlFor="2xBtn">2x Size</label>
        <input
          type="radio"
          id="4xBtn"
          name="size"
          value="4x"
          checked={size === '4x'}
          onChange={(e) => setSize(e.target.value)}
        />
        <label htmlFor="4xBtn">4x Size</label>
      </div>

      <div>
        {emotes.map((emote: any) => {
          const isAnimated = emote.format.includes('animated');

          const imageUrl = isAnimated
            ? emote.images[`url_${size}`].replace('static/', 'animated/')
            : emote.images[`url_${size}`];

          return <img key={emote.id} src={imageUrl} alt={emote.name} />;
        })}
      </div>
    </>
  );
};

export default EmoteFetcher;
