import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { list_categories } from "../domain/category.domain";
import { get_entries, EntriesQuery } from "../domain/entry.domain";
import { Entry } from "../models/Entry.models";

type Myrequest = FastifyRequest<{
    Body: { id: string },
    Querystring: { id: string }
}>

const delete_entry = async (request: Myrequest, reply: FastifyReply) => {
    const { id } = request.query;
    console.log(`Deleting entry ${id}...`);
    await Entry.findByIdAndDelete(id);
    return reply.redirect("/")
}

export const main_router: FastifyPluginAsync = async (app) => {
    app.get<{ Querystring: EntriesQuery }>("/", async (request, reply) => {

        const entries = await get_entries(request.query);
        let categories = await list_categories();

        const data = { title: "Our entries", categories, entries };
        return reply.view("views/home", data);
    });

    app.get("/delete_entry", delete_entry)
}