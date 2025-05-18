// Função que higieniza os dados de uma linha do CSV com segurança reforçada
function sanitizeData(row) {

  // Cria um novo objeto para armazenar a linha higienizada
  const sanitizedRow = {};

  // Percorre todas as colunas (chaves) do objeto original
  for (const key in row) {

    // Garante que a coluna (chave) pertence ao próprio objeto (evita herança de protótipo)
    if (row.hasOwnProperty(key)) {

      // Pega o valor da coluna atual
      const value = row[key];

      // Se o valor for do tipo string
			if (typeof value === "string") {
				// Remove espaços do início/fim e múltiplos espaços entre palavras
        sanitizedRow[key] = value.trim().replace(/\s+/g, " ");
      }

      // Se o valor for nulo ou indefinido
      else if (value === null || value === undefined) {
        // Substitui por uma string vazia
        sanitizedRow[key] = "";
      }

      // Para outros tipos (números, booleanos, etc.)
      else {
        // Converte para string, remove espaços extras
        sanitizedRow[key] = String(value).trim().replace(/\s+/g, " ");
      }
    }
  }

  // Retorna o novo objeto com todos os campos (colunas) higienizados
  return sanitizedRow;
}

// Exporta a função para que possa ser usada em outros arquivos
module.exports = { sanitizeData };
