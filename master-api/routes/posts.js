const express = require("express");
const Post = require("../models/Post");
const api = require("../util/api");
const router = express.Router();

//create object in database
router.post("/", async (req, res) => {
  try {
    let post = new Post(req.body); //reads the req body and create post obj
    post = await post.save(); //saves to database
    res.status(200).json({ 
      status: 200,
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//Post msg to microservice2
router.post("/:postId/message/", async (req, res) => {
  try {
    let post = await Post.findOne({ //finding post using unique id
      _id: req.params.postId,
    });
    api
      .call("http://localhost:3032/posts/respond", {
        "x-api-key": post["apiSecret"],
      })
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});


module.exports = router;
