O que cada pasta/arquivo faz?

api-crud-mysql/
├── package.json                       <-- 📌 Arquivo de configuração do projeto (dependências, scripts, etc.)
├── package-lock.json                  <-- 📌 Travamento de versões exatas das dependências instaladas
├── index.js                           <-- 📌 Arq. principal que  importa a configuração(app) do server.js e inicializa o servidor 
├── server.js                          <-- 📌 Arquivo de configuração do servidor Express , puglins, middlewares e rotas.
├── .env                               <-- 📌 Variáveis de ambiente (ex.: credenciais do banco, portas, etc.)
├── src/                               <-- 📂 Diretório principal do código-fonte da aplicação
│   ├── config/                        <-- 📂 Configuração dos bancos de dados
│   │   ├── owncloudConfig.js          <-- ✅ Configuração da conexão com o Owncloud Server (sob demanda)
│   │   ├── mysqlConfig.js             <-- ✅ Configuração da conexão com o MySQL (sob demanda)
│   │   ├── mongoConfig.js             <-- ✅ Configuração da conexão com o MongoDB (sob demanda)
│   ├── routes/                        <-- 📂 Define as rotas da API
│   │   ├── userRoutes.js              <-- ✅ Rotas de usuários (ex.: cadastro, login, atualização)
│   │   ├── migrationRoutes.js         <-- ✅ Rota para migração de dados entre bancos
│   │   ├── migrationRoutesOwncloud.js <-- ✅ Rota para migração de dados entre diretórios do Owncloud Server
│   │   ├── fileProcessingRoutes.js    <-- ✅ Rotas para processamento de arquivos CSV, enviar msg ao RabbitMQ
│   │   ├── fileProcessingRoutesOwncloud.js <-- ✅ Rotas para processamento de arquivos CSV do Owncloud
│   ├── controllers/                   <-- 📂 Lógica de negócios das rotas
│   │   ├── userController.js          <-- ✅ Lógica para gerenciar usuários no MySQL
│   │   ├── migrationController.js     <-- ✅ Lógica para migração de dados entre bancos
│   │   ├── migrationControllerOwncloud.js <-- ✅ Lógica para migração de dados entre diretórios do Owncloud Server
│   │   ├── fileProcessingController.js <-- ✅ Lógica de processamento e higienização de arquivos CSV, chamar o RabbitMQ
│   │   ├── fileProcessingControllerOwncloud.js <-- ✅ Lógica de processamento e higienização de arquivos CSV do Owncloud
│   ├── services/                      <-- 📂 Serviços auxiliares reutilizáveis
│   │   ├── fileService.js             <-- ✅ Contém funções auxiliares para manipulação de arquivos
│   │   ├── rabbitmqService.js
├── storage/                           <-- 📂 Diretório onde os arquivos CSV são armazenados e processados
│   ├── work/                          <-- 📂 Arquivos brutos aguardando processamento
│   │   ├── file.csv                
│   ├── temporário/                    <-- 📂 Arquivos que estão sendo processados no momento
│   ├── finalizado/                    <-- 📂 Arquivos processados e finalizados
│   │   ├── file_finalizado.csv     

Observação: 
Criar um diretório utils para armazenar arquivos de funções complementares.
Por exemplo, uma função que faz apenas uma coisa, mas pode ser usada em vários locais. Ao invés de fazer o código várias vezes, você 
cria um arquivo com a função e pode importar ela onde você precisar usar, como uma função que higieniza uma string, formata um cpf, 
etc.

1. server.js - Arquivo principal do servidor

Responsável por:
-Iniciar o servidor Express
-Carregar as rotas da aplicação
-Não conecta diretamente ao banco, garantindo eficiência

Fluxo de execução:
1-Importa pacotes (dotenv, express)
2-Carrega as rotas (userRoutes, migrationRoutes, fileProcessingRoutes, migrationRoutesOwncloud.js, fileProcessingRoutesOwncloud.js)
3-Inicia o servidor na porta definida no .env

2. .env - Configuração de variáveis de ambiente

Responsável por:
-Armazenar configurações sensíveis (senhas, URLs do banco, porta do servidor)
-Permite modificar as configurações sem alterar o código-fonte

3. src/config/mysqlConfig.js - Configuração da conexão MySQL sob demanda

Responsável por:
-Criar conexões com o banco MySQL apenas quando necessário
-Retornar uma instância da conexão
-Evitar conexões permanentes que desperdiçam recursos

Fluxo de execução:
1-Importa mysql2/promise
2-Cria a função queryDatabase() que conecta e retorna a conexão
3-Quando chamada, a função conecta e permite fazer queries

4. src/config/mongoConfig.js - Configuração da conexão MongoDB sob demanda

Responsável por:
-Criar conexões com o MongoDB apenas quando necessário
-Retornar uma instância da conexão
-Fechar a conexão após cada requisição

Fluxo de execução:
1-Importa MongoClient do pacote mongodb
2-Define a função connectToMongoDB() que cria e retorna uma conexão
3-O banco só é acessado quando chamado e fechado logo depois

5. src/routes/userRoutes.js - Rotas para usuários

Responsável por:
-Definir as rotas para operações relacionadas a usuários
-Delegar a execução para o userController.js

Fluxo de execução:
1-Importa express e o userController
2-Cria um router e define as rotas (exemplo: GET /users)
3-Exporta o router para ser usado no server.js

6. src/controllers/userController.js - Lógica de usuários

Responsável por:
-Executar operações relacionadas a usuários no MySQL
-Abrir e fechar conexões corretamente

Fluxo de execução:
1-Conecta ao MySQL
2-Executa uma query (SELECT * FROM users)
3-Retorna os resultados e fecha a conexão após a consulta

7. src/routes/migrationRoutes.js - Rota para migração

Responsável por:
-Criar uma rota que dispara a migração de dados entre bancos MongoDB
-Chamar a função migrateData do migrationController.js

Fluxo de execução:
1-Define uma rota POST /migrate
2-Chama o controller migrateData

8. src/controllers/migrationController.js - Lógica de migração

Responsável por:
-Migrar dados de um banco MongoDB para outro
-Abrir e fechar a conexão automaticamente

Fluxo de execução:
1-Abre uma conexão MongoDB (connectToMongoDB())
2-Busca os dados na coleção de origem (cadastro_A)
3-Insere os dados na coleção de destino (cadastro_B) em lotes
4-Fecha a conexão ao final

9. src/routes/fileProcessingRoutes.js - Rotas para processamento de arquivos

Responsável por:
-Definir as rotas para processamento de arquivos CSV
-Delegar a lógica para o fileProcessingController.js

Fluxo de execução:
1-Importa express e fileProcessingController
2-Cria um router e define a rota POST /process
3-Exporta o router para ser usado no server.js

10. src/controllers/fileProcessingController.js - Lógica para processar arquivos CSV

Responsável por:
-Processar arquivos CSV em chunks para evitar estouro de memória
-Aplicar higienização nos dados
-Mover arquivos entre as pastas work, temporário e finalizado

Fluxo de execução:
1-Recebe uma lista de arquivos via requisição POST /process
2-Verifica se os arquivos existem na pasta work/
3-Lê cada arquivo CSV em chunks (exemplo: 1000 linhas por vez)
4-Aplica a higienização (trim() e replace(/\s+/g, " "))
5-Escreve os arquivos processados na pasta temporário/
6-Move os arquivos para finalizado/ após o processamento

11. storage/ - Diretório para manipulação de arquivos

Responsável por:
-Armazenar os arquivos CSV antes, durante e depois do processamento

Subpastas:
-work/ → Contém os arquivos CSV brutos aguardando processamento
-temporário/ → Armazena arquivos enquanto estão sendo processados
-finalizado/ → Guarda os arquivos processados

12. Fluxo de Processamento no OwnCloud

1)Coleta de Arquivos
-A aplicação acessa o OwnCloud e busca arquivos no diretório work/.

2)Higienização via Stream
-Os arquivos são lidos em chunks diretamente para evitar sobrecarga de memória.
-Cada linha é higienizada com funções que removem espaços extras, caracteres indesejados e normalizam os dados.
-O processamento ocorre dentro do diretório temporário/.

3)Conclusão do Processamento
-Após o processamento, os arquivos são movidos para finalizado/ no OwnCloud.

13. src/utils/ - Diretório para funções utilitárias reutilizáveis

1)Responsável por:
-Armazenar funções auxiliares que podem ser usadas em vários lugares do código.
-Evitar duplicação de código, garantindo que funções comuns sejam centralizadas e reutilizadas.

2)Exemplos de funções armazenadas:
-stringUtils.js: Funções para higienização de strings (ex.: trim(), remoção de espaços extras, caracteres especiais).
-cpfUtils.js: Função para validação e formatação de CPF.