import createError from "http-errors";
import Books from "../models/books.js";

export async function getAll(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { books, total } = await Books.findAll(req.userId, page, limit);

        const totalPages = Math.ceil(total / limit);

        res.json({
            books,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
    } catch (e) {
        next(e);
    }
}

export async function create(req, res, next) {
    try {
        const book = await Books.create({
            ...req.body,
            userId: req.userId
        });

        res.json({ message: "Book added successfully", book });
    } catch (e) {
        next(e);
    }
}

export async function update(req, res, next) {
    try {
        const book = await Books.update(req.params.id, req.userId, req.body);

        if (!book) throw createError(404, "Book not found");

        res.json({ message: "Book updated successfully", book });
    } catch (e) {
        next(e);
    }
}

export async function remove(req, res, next) {
    try {
        const ok = await Books.deleteBook(req.params.id, req.userId);

        if (!ok) throw createError(404, "Book not found");

        res.json({ message: "Book deleted successfully" });
    } catch (e) {
        next(e);
    }
}