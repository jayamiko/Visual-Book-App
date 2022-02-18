const {register, login, checkAuth} = require("../controllers/auth");

// Route Auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
