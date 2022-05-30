import mongoose, { Schema, Document } from "mongoose";
import { Category } from "./Category.models";


export interface Entry extends Document {
    title: String;
    subtitle: String;
    body: String;
    img: String;
    hastag: [String];
    category: Category["_id"];
}

const schema = new Schema(
    {
        title: { type: String, required: true, minlength: [3, `The entry title must have a minimum length of 3 characters`], maxlength: [50, `The entry title must have a maximun length of 25 characters`], unique: true },
        subtitle: { type: String, required: true, minlength: [3, `The subtitle entry title must have a minimum length of 3 characters`], maxlength: [50, `The subtitle entry must have a maximun length of 25 characters`] },
        body: { type: String, required: true, minlength: [3, `The entry body must have a minimum length of 3 characters`], maxlength: [500, `The entry body must have a maximun length of 500 characters`] },
        img: { type: String, required: [true, `Image required`] },
        hastag: {type: [String], required: true},
        category: { type: Schema.Types.ObjectId, ref: "Category" },
    }, {
    timestamps: true
});

export const Entry = mongoose.model<Entry>("Entry", schema)