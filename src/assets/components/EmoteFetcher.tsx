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
      <div className="bg-twitchPurple text-white">
        <input
          className="bg-purple-200 text-gray-800 rounded-md"
          type="text"
          placeholder="Channel ID"
          value={channelId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChannelId(e.target.value)
          }
        />
        <button
          className="bg-purple-500 hover:bg-purple-400 rounded-lg py-1 px-2 mx-5 h-12.5"
          onClick={handleFetchEmotes}
        >
          View Channel's Emotes
        </button>
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

      <div className="flex flex-wrap mt-4">
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
