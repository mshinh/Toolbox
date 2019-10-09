const express = require("express");
const { getPosts, createPost } = require("../../controllers/post");
const router = express.Router();
const {createPostValidator} = require('../../validator/post');

router.get("/",getPosts);
router.post("/post",createPostValidator,createPost);

 
module.exports = router;