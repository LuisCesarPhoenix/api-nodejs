//Arq. principal que  importa a configuração(app) do server.js e inicializa o servidor sem abrir conexões.

const app = require('./server')
/*
Importa o objeto app que foi exportado do server.js.
O server.js contém toda a configuração do servidor Express, como middlewares, plugins e rotas.
Assim, o index.js não precisa se preocupar com essas configurações, ele apenas usa o app para iniciar o servidor.
*/

const PORT = process.env.PORT || 3000;
/*
Define a porta onde o servidor vai rodar.
Se existir a variável de ambiente PORT, ele usa esse valor; caso contrário, usa a porta padrão 3000.
*/

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
/*
Inicia o servidor Express e faz com que ele escute conexões na porta definida.
Quando o servidor começa a rodar, ele exibe a mensagem "🚀 Servidor rodando em http://localhost:PORT" no terminal.
*/

/*
Resumo do Fluxo do Código
1. O index.js é o ponto de entrada da aplicação.
a)Ele importa o app do server.js, que contém toda a configuração do servidor Express (middlewares, rotas, plugins, etc.).
b)Isso separa responsabilidades, deixando o server.js focado na configuração e o index.js focado em iniciar o servidor.

2. Define a porta do servidor.
a)Se houver uma variável de ambiente PORT, ela será usada.
b)Caso contrário, o servidor rodará na porta 3000 por padrão.

3. Inicia o servidor.
O método app.listen(PORT, callback) faz o servidor começar a escutar requisições na porta definida.

Fluxo Resumido em Etapas
1-Configuração do servidor (server.js).
2-Importação e inicialização no index.js.
3-Definição da porta.
4-Execução do servidor e exibição da mensagem no console.
*/
