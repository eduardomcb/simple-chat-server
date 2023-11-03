require("dotenv").config();

const defaultConfig = {
  PORT: process.env.PORT || 8000,
  messagesWhenLeaving: [
    "saiu porque esqueceu de pagar a internet",
    "saiu a mimir",
    "saiu para comprar pão",
    "saiu para soltar um barro",
    "saiu para fazer uma boquinha",
    "saiu para assaltar a geladeira",
    "saiu do armário",
    "saiu para fazer umas comprinhas",
    "saiu porque não sabe dirigir um caminhão",
    "saiu pra comer tapioca",
    "saiu pra comer uma lasanha",
    "saiu pra tomar sorvete",
    "saiu pra pagar boleto",
    "saiu...",
  ],
};

export default {
  ...defaultConfig,
};
