import { FilterQuery } from "mongoose";
import { Entry } from "../models/Entry.models";

export type EntriesQuery = {
    category_id?: string
}

export const list_entry = async () => {
    const entries = await Entry.find().lean();
    return entries
}

export const get_entries = async (params: EntriesQuery = {}) => {
    let query: FilterQuery<Entry> = {}

    // Note: Also filter by category if requested
    if (params.category_id) {
        query.category = params.category_id;
    }
    // Do the query in database
    const entries = await Entry.find(query).lean();

    return entries
}