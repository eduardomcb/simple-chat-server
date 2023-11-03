import app from "./app";
import chalk from "chalk";
import constants from "./config/constants";
import { configureWebSocket } from "./websocket";

const server = app.listen(constants.PORT, (err) => {
  if (err) {
    console.log(chalk.red("Cannot run!"));
  } else {
    console.log(
      chalk.green.bold(
        `
        Tudo pronto para decolar! 🚀
        Servidor rodando na porta: ${constants.PORT} 🎉
        Ambiente: ${process.env.NODE_ENV} 🦄
        Hora da inicialização: ${new Date().toLocaleTimeString()}
    `
      )
    );
  }
});

const wss = configureWebSocket(server);
export default wss;
