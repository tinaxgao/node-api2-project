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
      res.status(500).json({
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
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.insert(req.body)
      .then(({ id }) => {
        return Posts.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

router.put("/:id", (req, res) => {
  res.json("foo");
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    if (!post) {
        res.status(404).json({message: "The post with the specified ID does not exist"})
    } else {
        await Posts.remove(req.params.id)
        res.json(post) //returns the deleted post object
    }
  }
  catch (err) {
    res.status(500).json({
        message: "The post could not be removed",
  })}
});

router.get("/:id/comments", (req, res) => {
  res.json("foo");
});

module.exports = router;
