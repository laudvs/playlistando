const SPOTIFY_ACCESS_TOKEN = new URLSearchParams(window.location.hash.substring(1)).get("access_token");

if (!SPOTIFY_ACCESS_TOKEN) {
    alert("Erro na autenticação do Spotify. Por favor, faça login novamente.");
    window.location.href = "index.html"; 
}

async function getUserProfile() {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: { "Authorization": `Bearer ${SPOTIFY_ACCESS_TOKEN}` }
        });

        const data = await response.json();
        document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${data.display_name}!`;
    } catch (error) {
        console.error("Erro ao obter perfil do usuário:", error);
    }
}

getUserProfile();

document.getElementById("generatePlaylist").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    if (!prompt) {
        alert("Por favor, insira um comando.");
        return;
    }

    try {
        const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `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` // Substitua pela sua chave da OpenAI
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Crie uma playlist baseada nisso: ${prompt}` }]
            })
        });

        const openAiData = await openAiResponse.json();
        const musicList = openAiData.choices[0].message.content.split("\n").filter(song => song.trim());

        const playlistResponse = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: `Playlist: ${prompt}`, public: true })
        });

        const playlistData = await playlistResponse.json();
        const playlistUrl = playlistData.external_urls.spotify;

        const playlistContainer = document.getElementById("playlist-container");
        playlistContainer.innerHTML = `<a href="${playlistUrl}" target="_blank">Ouça sua Playlist</a>`;

        const historyList = document.getElementById("playlist-history");
        const historyItem = document.createElement("li");
        historyItem.innerHTML = `<a href="${playlistUrl}" target="_blank">${prompt}</a>`;
        historyList.appendChild(historyItem);

    } catch (error) {
        console.error("Erro ao criar playlist:", error);
        alert("Erro ao criar playlist.");
    }
});

document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("accessSpotify").addEventListener("click", () => {
    window.open("https://open.spotify.com/", "_blank");
});
