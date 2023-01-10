const express = require("express")
const { createPost, getPosts, getPostByUserId, getPostById, updatePost, likePost, deletePost, likePosts } = require("../controllers/postControllers")
const verifyOwner = require("../middlewares/verifyOwner")
const {protect} = require("../middlewares/protect")
const middleware = require("../middlewares/midellware")
const router = express.Router()
const multer = require('multer')
const Adminmiddleware = require("../middlewares/adminMidellware")

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname )
    }
  })

  const upload = multer({ storage })

router.post("/newPost",protect,createPost)
router.get("/",getPosts)
router.get("/:userId",getPostByUserId)
router.get("/post/:postId",getPostById)
router.put("/update/:postId",protect,updatePost)
router.put("/likes/:postId",protect,likePosts)
router.delete("/:postId",protect,deletePost)
router.delete("/:postId",Adminmiddleware,protect,deletePost)

module.exports = router