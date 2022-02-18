const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  UpdateUser,
  UpdateUserById,
  deleteUser,
} = require("../controllers/user");
const {register, login, checkAuth} = require("../controllers/auth");

// Middleware
const {auth, adminOnly} = require("../middlewares/auth");
const {uploadPDF, uploadImage} = require("../middlewares/uploadFile");

// Route User
router.get("/users", getUsers);
router.get("/user", auth, getUser);
router.patch("/user", auth, uploadImage("avatar"), UpdateUser);
router.patch("/user/specific", auth, UpdateUserById);
router.delete("/user/:id", deleteUser);

// Route Auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
