import mongoose, { Schema, Document } from "mongoose";
import { DB_URL } from "./config"
import { Entry } from "./models/Entry.models";
import { Category } from "./models/Category.models";

const createEntries = async () => {

    const category_demo = await Category.create({
        name: `demo`,
        img: "monsters.jpeg",
    })

    console.log(`✅ Category ${category_demo.name} created`);

    const entry1 = await Entry.create({
        title: "Lorem ipsum dolor sit amet",
        subtitle: "Consectetur adipiscing elit",
        body: "Maecenas nisi libero, posuere tincidunt mattis in, vestibulum quis libero. Aenean id turpis ac purus porta porttitor. Duis convallis sapien a elementum porttitor.",
        hastag: ["#entry", "#secret"],
        img: "entry.jpeg",
        category: category_demo._id
    });

    console.log(`✅ Entry created`);

    const entry2 = await Entry.create({
        title: "Ut lobortis fermentum neque vel convallis",
        subtitle: "Consectetur adipiscing elit",
        body: "Sed non scelerisque leo. In hac habitasse platea dictumst. In molestie elit urna, vitae ultrices erat rhoncus et. Nunc quis mi aliquet, posuere est ac, eleifend libero.",
        hastag: ["#entry", "#secret"],
        img: "entry.jpeg",
        category: category_demo._id
    });

    console.log(`✅ Entry created`);
}

(async () => {
    await mongoose.connect(DB_URL).then(() => console.log(`📦 Conected to ${DB_URL}`))

    try {
        await Category.collection.drop();
        await Entry.collection.drop();
    } catch (error) {
        console.log("There are no items to drop from db")
    };

    await createEntries();

    await mongoose.disconnect().then(() => console.log("bye"));

})();

