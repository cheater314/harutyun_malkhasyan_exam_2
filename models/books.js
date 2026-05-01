import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.resolve("data/books.json");

export async function readJSON() {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function writeJSON(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function findAll(userId, page, limit) {
    const books = await readJSON();

    const userBooks = books.filter(b => b.userId === userId);

    const total = userBooks.length;

    const skip = (page - 1) * limit;

    const paginated = userBooks.slice(skip, skip + limit);

    return {
        books: paginated,
        total
    };
}

export async function findById(id) {
    const books = await readJSON();
    return books.find(b => b.id === id) || null;
}







