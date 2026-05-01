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

export async function create(data) {
    const books = await readJSON();

    const newBook = {
        id: uuidv4(),
        ...data
    };

    books.push(newBook);
    await writeJSON(books);

    return newBook;
}

export async function update(id, userId, data) {
    const books = await readJSON();

    const index = books.findIndex(b => b.id === id && b.userId === userId);

    if (index === -1) return null;

    books[index] = { ...books[index], ...data };

    await writeJSON(books);

    return books[index];
}

export async function deleteBook(id, userId) {
    const books = await readJSON();

    const filtered = books.filter(b => !(b.id === id && b.userId === userId));

    if (filtered.length === books.length) return false;

    await writeJSON(filtered);

    return true;
}

export default {
    readJSON,
    writeJSON,
    findAll,
    findById,
    create,
    update,
    deleteBook
};