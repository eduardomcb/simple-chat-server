import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import expressStatusMonitor from "express-status-monitor";

import ApiRoutes from "./routes/index";

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.set("trust proxy", 1);
    this.express.use(express.static("./public"));
    this.express.disable("x-powered-by");
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(expressStatusMonitor());
    this.express.use(morgan("dev"));
  }

  routes() {
    this.express.use("/api/v1", ApiRoutes);
  }
}

export default new AppController().express;
