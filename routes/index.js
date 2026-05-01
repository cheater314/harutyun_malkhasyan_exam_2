import { Router } from "express";
import authRouter from "./auth.js";
import booksRouter from "./books.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the Book Library API" });
});

router.use("/auth", authRouter);
router.use("/books", booksRouter);

export default router;