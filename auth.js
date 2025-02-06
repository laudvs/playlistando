import CONFIG from './config.js';

export const getSpotifyAccessToken = () => {
    return new URLSearchParams(window.location.hash.substring(1)).get("access_token");
};

export const handleSpotifyLogin = () => {
    const authUrl = `${CONFIG.AUTH_ENDPOINT}?client_id=${CONFIG.CLIENT_ID}&redirect_uri=${encodeURIComponent(CONFIG.REDIRECT_URI)}&response_type=${CONFIG.RESPONSE_TYPE}&scope=${encodeURIComponent(CONFIG.SCOPE)}`;
    window.location.href = authUrl;
};

export const checkAuth = () => {
    const token = getSpotifyAccessToken();
    if (!token) {
        alert("Erro na autenticação do Spotify. Por favor, faça login novamente.");
        window.location.href = "/pages/index.html";
    }
    return token;
};
