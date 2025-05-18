const axios = require("axios");
const parser = require("fast-xml-parser");
require("dotenv").config();

// Configurações do OwnCloud
const OWNCLOUD_DOMAIN = process.env.OWNCLOUD_DOMAIN;
const USERNAME = process.env.OWNCLOUD_USER;
const PASSWORD = process.env.OWNCLOUD_PASS;

// Cliente Axios pré-configurado para o OwnCloud
const axiosOwnCloud = axios.create({
  baseURL: `${OWNCLOUD_DOMAIN}/remote.php/dav/files/${USERNAME}/`,
  auth: { username: USERNAME, password: PASSWORD },
  headers: { "Content-Type": "application/json" },
});

/**
 * Testa a conexão com o OwnCloud
 */
async function testarConexao() {
  try {
    const response = await axiosOwnCloud.request({
      method: "PROPFIND",
      url: "/",
      headers: { Depth: "1" }, // Necessário para listar diretórios no WebDAV
    });

    console.log("✅ Conectado ao OwnCloud com sucesso!");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Erro ao conectar ao OwnCloud:", error.response?.data || error.message);
  }
}

/**
 * Lista os arquivos de um diretório no OwnCloud
 * @param {string} directory - Nome do diretório (ex: "work")
 * @returns {Promise<string[]>} - Lista de arquivos no diretório
 */
async function listFiles(directory) {
  try {
    const response = await axiosOwnCloud.request({
      method: "PROPFIND",
      url: `/${directory}/`,
      headers: { Depth: "1" },
    });

    // Faz o parsing do XML para extrair os arquivos listados
    const parsed = parser.parse(response.data);
    const files = parsed["d:multistatus"]["d:response"]
      .map((item) => item["d:href"])
      .filter((path) => !path.endsWith("/")) // Remove diretórios da lista

    return files;
  } catch (error) {
    console.error("❌ Erro ao listar arquivos do OwnCloud:", error);
    throw error;
  }
}

/**
 * Baixa um arquivo do OwnCloud
 * @param {string} filename - Nome do arquivo (ex: "dados.csv")
 * @returns {Promise<stream.Readable>} - Stream do arquivo baixado
 */
async function downloadFile(filename) {
  try {
    const response = await axiosOwnCloud.get(`work/${filename}`, { responseType: "stream" });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao baixar arquivo:", error);
    throw error;
  }
}

/**
 * Faz upload de um arquivo para o OwnCloud
 * @param {string} filename - Nome do arquivo (ex: "resultado.csv")
 * @param {stream.Readable} stream - Conteúdo do arquivo
 */
async function uploadFile(filename, stream) {
  try {
    await axiosOwnCloud.put(`finalizado/${filename}`, stream, {
      headers: { "Content-Type": "text/csv" },
    });
    console.log(`✅ Arquivo ${filename} enviado para 'finalizado/'`);
  } catch (error) {
    console.error("❌ Erro ao enviar arquivo para OwnCloud:", error);
    throw error;
  }
}

// Testa a conexão ao iniciar
testarConexao();

module.exports = { listFiles, downloadFile, uploadFile };

/*
O módulo fast-xml-parser não está instalado. Para corrigir isso, execute o seguinte comando no terminal dentro do diretório do projeto: cd api-crud-mysql && npm install fast-xml-parser
Depois, reinicie o nodemon: npm run dev
*/

/*
O código foi refatorado para melhorar a organização, reutilização e legibilidade:
Melhorias Aplicadas:
Removido código comentado para evitar confusão.
Criado um cliente axios reutilizável (axiosOwnCloud).
Corrigido listFiles para garantir que o diretório seja corretamente acessado.
Adicionado parsing do XML para extrair corretamente os arquivos listados.
*/

/*
O que foi melhorado?
Reutilização do Axios: Configurado axiosOwnCloud para evitar repetição de código.
Parsing do XML: Agora listFiles extrai corretamente os nomes dos arquivos do XML de resposta.
Melhoria na depuração: Mensagens de erro mais detalhadas.
Legibilidade e organização: Código mais limpo e modular.
*/
