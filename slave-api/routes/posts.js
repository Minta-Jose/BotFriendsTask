const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

//returns res to ms2 
router.get("/respond", async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"]; //read the secret from headers
    let post = await Post.findOne({  //vsalidate the api key
      apiSecret: apiKey,
    });
    if (post) {
      //console.log();
      res.status(200).json({
        status: 200,
        data: {
          message: `Hi Minta, Welcome to Bot friends`,
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Check the webhook secret",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
