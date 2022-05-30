import { Category } from "../models/Category.models";

export const list_categories = async () => {
    const categories = await Category.find().lean();
    return categories
}