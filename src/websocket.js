import { WebSocketServer } from "ws";
import WebSocket from "ws";
import chalk from "chalk";
import constants from "./config/constants";

export function broadcast(jsonObject) {
  if (!this.clients) return;
  this.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(jsonObject));
    }
  });
}

export function configureWebSocket(server) {
  const wss = new WebSocketServer({ server: server, path: "/chat" });
  const clients = new Map();

  const MessageSource = {
    USER: "USER",
    SERVER: "SERVER",
  };

  wss.on("connection", (ws, req) => {
    const metadata = { username: req.headers["username"] };
    clients.set(ws, metadata);
    console.log("Novo cliente conectado");

    const serverMessage = {
      username: metadata.username,
      message: "Bem-vindo ao chat!",
      timestamp: new Date().toLocaleString(),
      source: MessageSource.SERVER,
    };

    [...clients.keys()].forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(serverMessage));
      }
    });

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        const metadata = clients.get(ws);
        if (data.message) {
          const timestamp = new Date().toLocaleString();
          const formattedMessage = {
            username: metadata.username,
            message: data.message,
            timestamp: timestamp,
            source: MessageSource.USER,
          };

          [...clients.keys()].forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(formattedMessage));
            }
          });

          console.log(`[${timestamp}] ${metadata.username}: ${data.message}`);
        }
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
      }
    });

    ws.on("close", () => {
      const serverMessage = {
        username: metadata.username,
        message:
          constants.messagesWhenLeaving[
            Math.floor(Math.random() * constants.messagesWhenLeaving.length)
          ],
        timestamp: new Date().toLocaleString(),
        source: MessageSource.SERVER,
      };

      [...clients.keys()].forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(serverMessage));
        }
      });
      console.log("Cliente desconectado");
    });
  });

  console.log(
    chalk.green.bold(
      `
      Servidor WebSocket está em execução na porta: ${constants.PORT} 🎉
    `
    )
  );

  wss.broadcast = broadcast;

  return wss;
}
