const CLIENT_ID = 'd83eef9d38aa439fa19b1a9898fdab09';
const REDIRECT_URI = 'http://localhost:3000/inicio.html';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'playlist-modify-public playlist-modify-private';

document.getElementById('spotify-login').addEventListener('click', () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;
    window.location.href = authUrl;
});
