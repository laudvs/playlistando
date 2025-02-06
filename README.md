Sistemas Distribuídos
Playlistando
Descrição
O Playlistando é um aplicativo web que permite aos usuários criarem playlists no Spotify com base em um prompt de texto. Ele utiliza a API do OpenAI para gerar sugestões de músicas e a API do Spotify para criar e salvar as playlists.
Tecnologias Utilizadas
HTML, CSS e JavaScript para a interface do usuário
Spotify Web API para autenticação e criação de playlists
OpenAI API para a geração das músicas com base no prompt do usuário
Requisitos
Antes de executar o projeto, você precisará das seguintes ferramentas:
Conta no Spotify Developer
Conta na OpenAI
Servidor local como Live Server (VS Code) ou Python SimpleHTTPServer
Configuração e Execução
1. Clonar o repositório
git clone https://github.com/seu-usuario/playlistando.git
cd playlistando

2. Configurar credenciais
Crie um arquivo config.js na pasta /js e adicione as credenciais da API do Spotify e OpenAI:
const CONFIG = {
    CLIENT_ID: "SEU_CLIENT_ID_SPOTIFY",
    REDIRECT_URI: "http://127.0.0.1:5500/pages/inicio.html",
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
    SCOPE: "playlist-modify-public playlist-modify-private",
    SPOTIFY_API_URL: "https://api.spotify.com/v1",
    OPENAI_API_URL: "https://api.openai.com/v1",
    OPENAI_API_KEY: "SUA_CHAVE_OPENAI"
};
export default CONFIG;

3. Iniciar o servidor local
Se estiver usando Live Server no VS Code, basta abrir o projeto e clicar em "Go Live". Se estiver usando Python:
python -m http.server 5500

Acesse http://127.0.0.1:5500/index.html no navegador.
Como Usar
Clique no botão "Conectar com Spotify" para autenticar sua conta.
Insira um prompt descrevendo o tipo de playlist desejado.
Clique no botão "Criar Playlist" e aguarde a geração das músicas.
Sua playlist será criada automaticamente e aparecerá no Spotify.

