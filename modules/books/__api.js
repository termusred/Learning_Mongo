import express from "express";
import isLoggedIn from "../Auth/IsLoggedIn.js";
import { 
  DeleteBook, 
  GetAllBooks, 
  GetBookById, 
  PatchBook, 
  CreateBook
} from "./__controller.js";
import { 
  patchBookSchema, 
  deleteBookSchema, 
  getBookByIdSchema, 
  getAllBooksSchema, 
  createBookSchema,
  validate 
} from "./__schema.js";

const router = express.Router();

// Books-related routes
router.get('/books', isLoggedIn, validate(getAllBooksSchema), GetAllBooks);
router.get('/books/:bookId', isLoggedIn, validate(getBookByIdSchema), GetBookById);

router.post("/books", isLoggedIn, validate(createBookSchema), CreateBook);

router.delete("/books", isLoggedIn, validate(deleteBookSchema), DeleteBook);

router.patch("/books", isLoggedIn, validate(patchBookSchema), PatchBook);

export default router;
