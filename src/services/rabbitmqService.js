// Este serviço envia mensagens para o pyService sempre que um arquivo precisar ser processado.

const amqp = require('amqplib'); // Biblioteca para conectar ao RabbitMQ

// URL da conexão, padrão: usuário admin, senha admin, localhost na porta 5672
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672';

// Nome da fila que será usada para enviar as mensagens
const QUEUE_NAME = 'file_processing_queue';

async function sendToQueue(filePath) {
    try {
        // Cria a conexão com o RabbitMQ
        const connection = await amqp.connect(RABBITMQ_URL);

        // Cria o canal para envio da mensagem
        const channel = await connection.createChannel();

        // Garante que a fila exista e seja durável (não se perde após reiniciar)
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        // Cria a mensagem com o caminho do arquivo
        const message = JSON.stringify({ file_path: filePath });

        // Envia a mensagem à fila, de forma persistente
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

        console.log(`📨 Enviado para RabbitMQ: ${filePath}`);

        // Fecha a conexão depois de 500ms para dar tempo de enviar
        setTimeout(() => connection.close(), 500);
    } catch (error) {
        console.error("❌ Erro ao enviar mensagem para RabbitMQ:", error);
    }
}

// Exporta a função para que possa ser usada em outras partes da aplicação
module.exports = { sendToQueue };
