// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "The posts information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "The posts information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
    });
});

router.post("/", (req, res) => {
  res.json("foo");
});

router.put("/:id", (req, res) => {
  res.json("foo");
});

router.delete("/:id", (req, res) => {
  res.json("foo");
});

router.get("/:id/comments", (req, res) => {
  res.json("foo");
});

module.exports = router;
