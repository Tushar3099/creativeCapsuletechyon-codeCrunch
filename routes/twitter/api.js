const express = require("express");
const router = express.Router();
const { twitterService } = require("../../services/twitter.service");

router.get("/user/:user_name", async (req, res) => {
  try {
    const data = await twitterService.tweetUsername({
      screen_name: req.params.user_name,
    });
    let tweets = [];
    data.forEach((item) => {
      tweets = [
        ...tweets,
        {
          created_at: item.created_at,
          text: item.text,
        },
      ];
    });

    res.send({
      user_name: data[0].user.name,
      user_screen_name: data[0].user.screen_name,
      followers_count: data[0].user.followers_count,
      friends_count: data[0].user.friends_count,
      tweets: tweets,
    });
  } catch (error) {
    res.send({
      status: error.status || 404,
      message: error.message || "tweets not found",
    });
  }
});
router.get("/hashtag/:hashtag", async (req, res) => {
  try {
    const data = await twitterService.tweetHashTag({
      q: `#${req.params.hashtag}`,
    });
    if (data != "") {
      let tweets = [];
      data.forEach((item) => {
        tweets = [
          ...tweets,
          {
            created_at: item.created_at,
            text: item.text,
          },
        ];
      });

      res.send({
        user_name: data[0].user.name,
        user_screen_name: data[0].user.screen_name,
        followers_count: data[0].user.followers_count,
        friends_count: data[0].user.friends_count,
        tweets: tweets,
      });
    } else {
      throw { status: 404, message: "tweets not found" };
    }
  } catch (error) {
    res.send({
      status: error.status || 404,
      message: error.message || "tweets not found",
    });
  }
});

module.exports = router;
