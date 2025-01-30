const API_KEY = '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';

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
