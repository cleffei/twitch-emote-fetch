import { useState } from 'react';
import { fetchEmotes } from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmoteFetcher = () => {
  const [channelId, setChannelId] = useState('');
  const [emotes, setEmotes] = useState<any[]>([]);
  const [size, setSize] = useState('2x');

  const handleFetchEmotes = async () => {
    if (!channelId) {
      toast.error('Channel ID field is empty!', { position: 'top-right' });
      return;
    } else {
      const emoteInfo = await fetchEmotes(channelId);
      if (!emoteInfo) {
        toast.warning('This channel has no emotes!', { position: 'top-right' });
        return;
      } else {
        setEmotes(emoteInfo);
        toast.success('Emotes successfully fetched!', {
          position: 'top-right',
        });
      }
    }
  };

  return (
    <>
      <div className="bg-twitchPurple text-white p-4 flex flex-wrap items-center justify-center space-x-4">
        <input
          className="bg-purple-200 text-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Channel ID"
          value={channelId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChannelId(e.target.value)
          }
        />
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition"
          onClick={handleFetchEmotes}
        >
          View Channel's Emotes
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="1xBtn"
            name="size"
            value="1x"
            checked={size === '1x'}
            onChange={(e) => setSize(e.target.value)}
            className="hidden peer/1x"
          />
          <label
            htmlFor="1xBtn"
            className="px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition peer-checked/1x:bg-white peer-checked/1x:text-purple-600 peer-checked/1x:shadow bg-purple-400 text-white"
          >
            1x
          </label>

          <input
            type="radio"
            id="2xBtn"
            name="size"
            value="2x"
            checked={size === '2x'}
            onChange={(e) => setSize(e.target.value)}
            className="hidden peer/2x"
          />
          <label
            htmlFor="2xBtn"
            className="px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition peer-checked/2x:bg-white peer-checked/2x:text-purple-600 peer-checked/2x:shadow bg-purple-400 text-white"
          >
            2x
          </label>

          <input
            type="radio"
            id="4xBtn"
            name="size"
            value="4x"
            checked={size === '4x'}
            onChange={(e) => setSize(e.target.value)}
            className="hidden peer/4x"
          />
          <label
            htmlFor="4xBtn"
            className="px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition peer-checked/4x:bg-white peer-checked/4x:text-purple-600 peer-checked/4x:shadow bg-purple-400 text-white"
          >
            4x
          </label>
        </div>
      </div>

      <ToastContainer />

      <div className=" max-w-2/3 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {emotes.map((emote: any) => {
          const isAnimated = emote.format.includes('animated');
          const imageUrl = isAnimated
            ? emote.images[`url_${size}`].replace('static/', 'animated/')
            : emote.images[`url_${size}`];

          return (
            <div
              key={emote.id}
              className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg"
            >
              <img src={imageUrl} alt={emote.name} className="object-contain" />
              <p className="mt-2 text-sm font-bold text-gray-700">
                {emote.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EmoteFetcher;
