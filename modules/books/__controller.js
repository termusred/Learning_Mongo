import Book from "./Book.js";
import fs from "fs";
import path from "path";


export async function GetAllBooks(req, res) {
    try {
        if (req.role === 'admin') {
            const limit = parseInt(req.query.limit) || 5;
            const page = parseInt(req.query.page) || 1;

            const total = await Book.countDocuments();
            const totalPages = Math.ceil(total / limit);

            const books = await Book.find()
                .skip((page - 1) * limit)
                .limit(limit);

            res.json({ data: books, total, totalPages });
        } else {
            return res.status(403).send({ msg: 'Forbidden: Only admin can access this route' });
        }
    } catch (error) {
        return res.status(500).send({ msg: 'Error: ' + error.message });
    }
}

export async function GetBookById(req, res) {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        res.status(200).json({ data: book });
    } catch (error) {
        return res.status(500).send({ msg: 'Error: ' + error.message });
    }
}

export async function CreateBook(req, res) {
    try {
        const { title, author, genre, publishedYear, description } = req.body;

        const photos = req.files ? req.files.map(file => file.filename) : [];

        const book = new Book({
            title,
            author,
            genre,
            publishedYear,
            description,
            photos
        });

        await book.save();

        res.status(201).json({ data: book });
    } catch (error) {
        res.status(500).send({ msg: "Error: " + error.message });
    }
}

export async function PatchBook(req, res) {
    try {
        const bookId = req.params.bookId; 
        const updates = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId, updates, { new: true, runValidators: true });

        if (!updatedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }

        res.status(200).json({ data: updatedBook });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

export async function DeleteBook(req, res) {
    try {
        const bookId = req.query.id;

        if (!bookId) {
            return res.status(400).send({ msg: 'Book ID is required to delete' });
        }

        if (req.role !== "admin") {
            return res.status(403).send({ msg: 'Forbidden: Only admin can access this route' });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).send({ msg: "Book not found" });
        }

        return res.status(200).send({ msg: "Book has been deleted" });
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}
