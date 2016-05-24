import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import logger from "./logger.js";

module.exports = app => {
    //Configura a URL Default da sua API
    app.set("apiUrl", "/api/v1")

    //Configura a porta a ser utilizada
    app.set("port", 8000);

    app.set("json spaces", 4);
    app.use(morgan("common", {
        stream: {
          write: (message) => {
            logger.info(message);
          }
        }
    }));
    app.use(helmet());

    //Habilita qual Servidor pode realizar requisições a sua API
    /* Exemplo:
    -Todos podem fazer requisições a api:
        app.user(cors());

    - Apenas o servidor localhost:3001 pode fazer requisições
        app.use(cors({
            origin: ["http://localhost:3001"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
    */

    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    app.use(express.static("public"));
};
