const csv = require("csv-parser");
const { downloadFile, uploadFile, listFiles } = require("../config/owncloudConfig");
const { sanitizeData } = require("../utils/sanitizeUtils");
const stream = require("stream");

async function processOwnCloudFiles(req, res) {
  try {
    const files = await listFiles("work"); // Diretório correto

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Nenhum arquivo encontrado no OwnCloud." });
    }

    for (const file of files) {
      const filename = file.split("/").pop();
      const fileStream = await downloadFile(filename);
      const processedStream = new stream.PassThrough();
      const writeStream = stream.Writable();

      let fileContent = "";

      fileStream
        .pipe(csv())
        .on("data", (row) => {
          const sanitizedRow = sanitizeData(row);
          fileContent += Object.values(sanitizedRow).join(",") + "\n";
        })
        .on("end", async () => {
          processedStream.end(fileContent);
          await uploadFile(filename, processedStream);
          console.log(`✅ ${filename} processado e enviado para 'finalizado/'`);
        });

      writeStream.on("finish", async () => {
        console.log(`📝 Processamento de ${filename} concluído.`);
      });
    }

    res.json({ message: "Arquivos processados com sucesso!" });
  } catch (error) {
    console.error("❌ Erro no processamento do OwnCloud:", error);
    res.status(500).json({ error: "Erro interno ao processar arquivos do OwnCloud." });
  }
}

module.exports = { processOwnCloudFiles };
