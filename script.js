const API_KEY = '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';
const params = new URLSearchParams(window.location.hash.substring(1));
const accessToken = params.get("access_token");

if (accessToken) {
    localStorage.setItem("spotify_access_token", accessToken);
}

document.getElementById('generatePlaylist').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    if (!prompt) {
        alert("Por favor, digite um comando para criar a playlist.");
        return;
    }

    document.getElementById('response').innerHTML = "Gerando playlist... 🎵";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Crie uma playlist com base nessa descrição: ${prompt}` }],
                max_tokens: 100
            })
        });

        const data = await response.json();
        const playlist = data.choices[0].message.content;

        document.getElementById('response').innerHTML = `<strong>Playlist Gerada:</strong><br>${playlist.replace(/\n/g, "<br>")}`;
    } catch (error) {
        console.error("Erro ao gerar playlist:", error);
        document.getElementById('response').innerHTML = "Erro ao gerar playlist. Tente novamente.";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const promptInput = document.getElementById("prompt");
    const generateButton = document.getElementById("generatePlaylist");
    const playlistContainer = document.getElementById("playlist-container");
    const historyList = document.getElementById("playlist-history");

    // Carregar histórico do localStorage
    function loadHistory() {
        const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
        historyList.innerHTML = "";
        playlists.forEach(playlist => {
            const li = document.createElement("li");
            li.textContent = playlist;
            historyList.appendChild(li);
        });
    }

    loadHistory();

    // Gerar playlist (simulação)
    generateButton.addEventListener("click", function() {
        const promptText = promptInput.value.trim();
        if (promptText === "") {
            alert("Digite um prompt para gerar a playlist.");
            return;
        }

        // Simulação da resposta da IA
        const generatedPlaylist = `🎵 Playlist baseada em: "${promptText}"`;

        // Exibir playlist gerada
        playlistContainer.innerHTML = `<p>${generatedPlaylist}</p>`;

        // Salvar no histórico
        let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
        playlists.push(generatedPlaylist);
        localStorage.setItem("playlists", JSON.stringify(playlists));

        // Atualizar histórico na interface
        loadHistory();
    });
});
