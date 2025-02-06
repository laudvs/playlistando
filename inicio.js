import CONFIG from './config.js';
import { checkAuth } from './auth.js';

class SpotifyPlaylistManager {
    constructor() {
        this.accessToken = checkAuth();
        this.init();
    }

    async init() {
        await this.getUserProfile();
        this.setupEventListeners();
    }

    async getUserProfile() {
        try {
            const response = await fetch(`${CONFIG.SPOTIFY_API_URL}/me`, {
                headers: { "Authorization": `Bearer ${this.accessToken}` }
            });
            const data = await response.json();
            document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${data.display_name}!`;
        } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error);
            this.handleError(error);
        }
    }

    async generatePlaylistWithAI(prompt) {
        try {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            const maxRetries = 3;
            let retries = 0;
            const button = document.getElementById("generatePlaylist");
            button.disabled = true;
            button.textContent = "Gerando músicas...";
    
            while (retries < maxRetries) {
                try {
                    const response = await fetch(`${CONFIG.OPENAI_API_URL}/chat/completions`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${CONFIG.OPENAI_API_KEY}`
                        },
                        body: JSON.stringify({
                            model: "gpt-3.5-turbo",
                            messages: [{ 
                                role: "user", 
                                content: `Crie uma playlist com 10 músicas baseada nisso: ${prompt}. Formato: Artista - Música` 
                            }]
                        })
                    });
    
                    if (response.status === 429) {
                        retries++;
                        await delay(10000 * retries);
                        continue;
                    }
    
                    const data = await response.json();
                    button.disabled = false;
                    button.textContent = "Criar Playlist";
                    
                    const songs = data.choices[0].message.content.split("\n").filter(song => song.trim());
                    if (!songs.length) {
                        throw new Error('Nenhuma música foi gerada');
                    }
                    return songs;
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw error;
                    }
                    retries++;
                    await delay(10000 * retries);
                }
            }
        } catch (error) {
            const button = document.getElementById("generatePlaylist");
            button.disabled = false;
            button.textContent = "Criar Playlist";
            throw error;
        }
    }
    
    async createPlaylist(prompt, musicList) {
        if (!musicList || !musicList.length) {
            throw new Error('Lista de músicas vazia');
        }
        const playlistResponse = await fetch(`${CONFIG.SPOTIFY_API_URL}/me/playlists`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                name: `Playlist: ${prompt}`, 
                public: true,
                description: "Criada automaticamente com IA"
            })
        });
        return playlistResponse.json();
    }
    

    updateUI(playlistUrl, prompt) {
        const playlistContainer = document.getElementById("playlist-container");
        playlistContainer.innerHTML = `<a href="${playlistUrl}" target="_blank">Ouça sua Playlist</a>`;

        const historyList = document.getElementById("playlist-history");
        const historyItem = document.createElement("li");
        historyItem.innerHTML = `<a href="${playlistUrl}" target="_blank">${prompt}</a>`;
        historyList.appendChild(historyItem);
    }

    handleError(error) {
        console.error("Erro:", error);
        if (error.message.includes('429')) {
            alert("O serviço está temporariamente sobrecarregado. Por favor, aguarde alguns minutos e tente novamente.");
        } else {
            alert("Ocorreu um erro ao gerar as músicas. Por favor, tente novamente.");
        }
    }
    
    
    setupEventListeners() {
        document.getElementById("generatePlaylist").addEventListener("click", async () => {
            const prompt = document.getElementById("prompt").value;
            if (!prompt) {
                alert("Por favor, insira um comando.");
                return;
            }
    
            try {
                const musicList = await this.generatePlaylistWithAI(prompt);
                const playlistData = await this.createPlaylist(prompt, musicList);
                this.updateUI(playlistData.external_urls.spotify, prompt);
            } catch (error) {
                this.handleError(error);
            }
        });

        document.getElementById("logout").addEventListener("click", () => {
            window.location.href = "index.html";
        });

        document.getElementById("accessSpotify").addEventListener("click", () => {
            window.open("https://open.spotify.com/", "_blank");
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SpotifyPlaylistManager();
});
