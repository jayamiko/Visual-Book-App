const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  UpdateUser,
  UpdateUserById,
  deleteUser,
} = require("../controllers/user");
const {
  getBooks,
  getBook,
  addBook,
  getSearch,
  updateBook,
  deleteBook,
} = require("../controllers/book");
const {
  getGenres,
  getGenre,
  addGenre,
  deleteGenre,
} = require("../controllers/genre");
const {
  getCollection,
  addCollection,
  deleteCollection,
} = require("../controllers/collection");

const {register, login, checkAuth} = require("../controllers/auth");

// Middleware
const {auth, adminOnly, authorOnly} = require("../middlewares/auth");
const {uploadPDF, uploadImage} = require("../middlewares/uploadFile");

// Route User
router.get("/users", getUsers);
router.get("/user", auth, getUser);
router.patch("/user", auth, uploadImage("avatar"), UpdateUser);
router.patch("/user/specific", auth, UpdateUserById);
router.delete("/user/:id", deleteUser);

// Route Book
router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.get("/book", auth, getSearch);
router.post("/book", auth, uploadPDF("attachement"), addBook);
router.put("/book/:id", auth, adminOnly, updateBook);
router.delete("/book/:id", auth, deleteBook);

// Route Genres
router.get("/genres", getGenres);
router.get("/genre/:id", getGenre);
router.post("/genre", auth, adminOnly, addGenre);
router.delete("/genre/:id", auth, adminOnly, deleteBook);

// Route Collections
router.get("/collection/:id", auth, getCollection);
router.post("/collection", auth, addCollection);
router.delete("/collection/:id", auth, deleteCollection);

// Route Auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
