import { Router } from "express";
import HTTPStatus from "http-status";
import APIError from "../services/error";
import wss from "../server";

import logErrorService from "../services/log";

const routes = new Router();

routes.get("/", (req, res, next) => {
  res.status(HTTPStatus.OK).send("Chat Server API");
});

routes.post("/broadcast/message", (req, res, next) => {
  console.log("body: ", req.body);
  try {
    wss.broadcast({ username: "Eduardo", message: "Hello" });
    res.status(HTTPStatus.OK).send("Broadcast enviado com sucesso");
  } catch (err) {
    res.status(HTTPStatus.BAD_REQUEST).send(err);
  }
});

routes.all("*", (req, res, next) =>
  next(new APIError("Not Found!", HTTPStatus.NOT_FOUND, true))
);

routes.use(logErrorService);

export default routes;
