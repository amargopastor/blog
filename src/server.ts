import fastify from "fastify";
import pino from "pino";
import { main_app } from "./app"
import { PORT } from "./config";

const server = fastify({
    logger: pino({
        name: "blog",
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: true,
                ignore: "time,pid,hostname,reqId",
                colorize: true,
            },
        },
    }),
    disableRequestLogging: true,
});

server.register(main_app)

server.listen(PORT, "0.0.0.0");