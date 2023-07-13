const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const booksCtrl = require("../controllers/books");
const multer = require("../middleware/multer-config");

router.get("/", booksCtrl.getAllBooks);
router.get("/bestrating", booksCtrl.getBestRatings);
router.get("/:id", booksCtrl.getOneBook);
router.post("/", auth, multer, booksCtrl.createBook);
router.post("/:id/rating", auth, booksCtrl.ratingBook);
router.put("/:id", auth, multer, booksCtrl.modifyBook);
router.delete("/:id", auth, booksCtrl.deleteBook);

module.exports = router;
