# Twitch Channel Emote Fetcher

WIP React webapp for fetching the emotes from a specified Twitch.tv channel ID. Emotes can be rendered at their native, 2x or 4x sizes.

## How to Use

Download the source files here and add in a `.env` file to the root of the project. Within that `.env` file, add in the `VITE_CLIENT_ID` and `VITE_ACCESS_TOKEN` with your respective keys.

## To Do:

- Allow searching with channel name as well as channel ID
- Implement local caching to prevent over-calling the Twitch API

## Packages

- Axios
- Toastify
