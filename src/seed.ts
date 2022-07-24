import mongoose, { Schema, Document } from "mongoose";
import { DB_URL } from "./config"
import { Entry } from "./models/Entry.models";
import { Category } from "./models/Category.models";

export const createEntries = async () => {

    const category_demo1 = await Category.create({
        name: `code`,
        img: "entry.jpeg",
    })

    console.log(`✅ Category ${category_demo1.name} created`);

    const category_demo2 = await Category.create({
        name: `food`,
        img: "entry.jpeg",
    })

    console.log(`✅ Category ${category_demo2.name} created`);

    const entry1 = await Entry.create({
        title: "Lorem ipsum dolor sit amet",
        subtitle: "Consectetur adipiscing elit",
        body: "Maecenas nisi libero, posuere tincidunt mattis in, vestibulum quis libero. Aenean id turpis ac purus porta porttitor. Duis convallis sapien a elementum porttitor.",
        hastag: ["#entry", "#secret"],
        img: "monsters.jpeg",
        category: category_demo1._id
    });

    console.log(`✅ Entry created`);

    const entry2 = await Entry.create({
        title: "Ut lobortis fermentum neque vel convallis",
        subtitle: "Consectetur adipiscing elit",
        body: "Sed non scelerisque leo. In hac habitasse platea dictumst. In molestie elit urna, vitae ultrices erat rhoncus et. Nunc quis mi aliquet, posuere est ac, eleifend libero.",
        hastag: ["#entry", "#secret"],
        img: "monsters.jpeg",
        category: category_demo1._id
    });

    console.log(`✅ Entry created`);

    const entry3 = await Entry.create({
        title: "Lorem ipsum dolor sit amet",
        subtitle: "Consectetur adipiscing elit",
        body: "Maecenas nisi libero, posuere tincidunt mattis in, vestibulum quis libero. Aenean id turpis ac purus porta porttitor. Duis convallis sapien a elementum porttitor.",
        hastag: ["#entry", "#secret"],
        img: "food.jpeg",
        category: category_demo2._id
    });

    console.log(`✅ Entry created`);

    const entry4 = await Entry.create({
        title: "Ut lobortis fermentum neque vel convallis",
        subtitle: "Consectetur adipiscing elit",
        body: "Sed non scelerisque leo. In hac habitasse platea dictumst. In molestie elit urna, vitae ultrices erat rhoncus et. Nunc quis mi aliquet, posuere est ac, eleifend libero.",
        hastag: ["#entry", "#secret"],
        img: "monsters.jpeg",
        category: category_demo1._id
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

