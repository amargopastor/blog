import { FastifyPluginAsync } from "fastify";
import formBodyPlugin from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import mongoose from "mongoose";
import path from "path";
import pointOfView from "point-of-view";
import { DB_URL } from "./config";
import { form_router } from "./routers/form.router";
import { main_router } from "./routers/main.router";

export const main_app: FastifyPluginAsync = async (app) => {
    mongoose.connect(DB_URL).then(() => app.log.info(`📦 Connected to ${DB_URL}`));
    app.register(fastifyStatic, {
        root: path.join(__dirname, "../public"),
        prefix: "/staticFiles/",
    });
    app.register(pointOfView, {
        engine: {
            handlebars: require("handlebars"),
        },
        layout: "./views/layouts/main.hbs",
        options: {
            partials: {
                entry: '/views/partials/entry.hbs',
                menu: '/views/partials/menu.hbs',
                entry_form: '/views/partials/forms/entry_form.hbs',
            }
        }
    });
    app.register(formBodyPlugin);
    app.register(main_router);
    app.register(form_router, { prefix: "/form" });
}