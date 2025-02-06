const CLIENT_ID = 'd83eef9d38aa439fa19b1a9898fdab09';
const REDIRECT_URI = 'http://127.0.0.1:5500/playlistando-main/pages/inicio.html';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'playlist-modify-public playlist-modify-private';

import { handleSpotifyLogin } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('spotify-login').addEventListener('click', handleSpotifyLogin);
});
