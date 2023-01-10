const express = require("express")
const {protect} = require("../middlewares/protect")
const {addComment ,deleteComment} = require("../controllers/CommentControllers")
const router = express.Router()

router.post("/newComment/:postId",protect,addComment)

router.delete("/:postId/:commentId",protect,deleteComment)

module.exports = router