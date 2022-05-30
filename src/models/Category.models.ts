import mongoose, { Schema, Document } from "mongoose"

export interface Category extends Document {
    name: String;
    img: String;
}

const schema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        img: {
            type: String,
            required: [true, `Image required`]
        },
    }, {
    timestamps: true
});

export const Category = mongoose.model<Category>("Category", schema)