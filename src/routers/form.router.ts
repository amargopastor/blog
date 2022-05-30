import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { list_categories } from "../domain/category.domain";
import { Category } from "../models/Category.models";

import { Entry } from "../models/Entry.models";

type MyRequest = FastifyRequest<{
    Body: { title: string, subtitle: string, body: string, hastag: string, id: string, name: string };
}>;

const entry_form = async (request: MyRequest, reply: FastifyReply) => {
    const { title, subtitle, body, hastag, id } = request.body;
    const entry = new Entry({
        title,
        subtitle,
        body,
        hastag,
        img: "entry.jpeg",
        category: id
    })
    const doc = await entry.save();
    console.log(`Created entry ${entry.title} with objectid ${doc._id}`);
    return reply.redirect("/");
}

const category_form = async (request: MyRequest, reply: FastifyReply) => {
    const { name } = request.body;
    const category = new Category({
        name,
        img: "monsters.jpeg"
    })
    const doc = await category.save();
    console.log(`Created category ${category.name} with objectid ${doc._id}`);
    return reply.redirect("/");
}

const add_entry = async (request: FastifyRequest, reply: FastifyReply) => {
    const categories = await list_categories();
    const data = { title: "Add an entry about your feelings", categories };
    return reply.view("views/add_entry", data);
}

const add_category = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = { title: "New category: 'Monsters', 'Aliens', 'Humans', 'Pirates', 'Clowns'" };
    return reply.view("views/add_category", data);
}

const deleteall = async (request: MyRequest, reply: FastifyReply) => {
    await Entry.deleteMany();
    return reply.redirect("/")
}

export const form_router: FastifyPluginAsync = async (app) => {
    app.post("/entry_form", entry_form);
    app.post("/category_form", category_form);
    app.get("/add_entry", add_entry);
    app.get("/add_category", add_category);
    app.get("/deleteall", deleteall)
}