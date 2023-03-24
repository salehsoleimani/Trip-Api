const express = require("express"),
  router = express.Router(),
  { dev } = require("../config/config"),
  User = require("../models/User.model"),
  { PostModel } = require("../models/post.model"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  cleanCache = require("../middlewares/cleanCache"),
  multer = require("multer"),
  { fileStorage, fileFilter } = require("../helpers/fileupload");

require("../helpers/cache");

router.post("/posts/:id/act", (req, res, next) => {
  const action = req.body.action;
  const counter = action === "Like";
  Post.update(
    { _id: req.params.id },
    { $inc: { likes_count: counter } },
    {},
    (err, numberAffected) => {
      res.send("");
    }
  );
});

//? like disike photo likes
router.post("/like/:id", (req, res) => {
  User.find(
    {
      "posts._id": req.params.id,
    },
    "posts.$",
    (err, doc) => {
      if (err) console.log(err);
      const alreadyLike = doc[0].posts[0].likes.some(
        (like) => like._id == req.user.id
      );

      if (alreadyLike) {
        User.update(
          {
            "posts._id": req.params.id,
          },
          {
            $inc: { "posts.$.likeCount": -1 },
            // push into post's like array
            $pull: { "posts.$.likes": { _id: req.user.id } },
          },
          (err) => {
            if (err) console.log(err);
            res.send("dislike");
          }
        );

        User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: {
              myLikes: {
                _id: req.params.id,
              },
            },
          },
          (err, user) => {
            if (err) console.log(err);
          }
        );
      } else {
        User.update(
          {
            "posts._id": req.params.id,
          },
          {
            $inc: { "posts.$.likeCount": 1 },
            $push: { "posts.$.likes": { _id: req.user.id } },
          },
          (err) => {
            if (err) console.log(err);
            Legend.find(
              {
                "posts._id": req.params.id,
              },
              (err, user) => {
                io.to(connectedUsers[user[0]._id]).emit(
                  "likePost",
                  req.user.username
                );
                res.send("like");
              }
            );
          }
        );

        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: {
              myLikes: {
                $each: [
                  {
                    _id: req.params.id,
                  },
                ],
                $position: 0,
              },
            },
          },
          (err, user) => {
            if (err) console.log(err);
          }
        );
      }
    }
  );
});

router.post("/newpost", cleanCache, async (req, res) => {
  if (!req.header("auth-token")) return res.status(401).send("unAuthorized");

  const post = new PostModel({
    text: req.body.username,
    author: {
      username: req.body.authorUsername,
    },
  });

  jwt.verify(req.header("auth-token"), dev.jwt, (err, decoded) => {
    if (err) return console.log(err);
    req.userId = decoded.id;
  });

  const newPost = await post.save();
  res.send(newPost);
});

router.post(
  "/addpost",
  multer({ storage: fileStorage, fileFilter }).single("Image"),
  async (req, res) => {
    let body = req.body;
    let TravelId = req.body.TravelId;
    let Image = req.file;
    let Description = req.body.Description;

    jwt.verify(req.header("auth-token"), dev.jwt, async (err, decoded) => {
      if (err) return console.log(err);
      let UserId = decoded.id;
      if ((req.files && req.files.Image) || (req.file && req.file.Image)) {
        // only if there are files
        const post = await PostModel.save({
          Image: "public/images/uploads/" + req.file.filename,
          TravelId,
          Description,
          UserId,
        });
        res.status(200).json({
          status: true,
          message: "پست با موفقیت آپلود شد",
          filepath: "public/images/uploads/" + req.file.filename,
        });
      } else {
        res.status(500).json({
          status: false,
          message: "اپلود فایل با مشکل مواجه شد",
        });
      }
    });
  }
);

router.post("/getall", async (req, res) => {
  jwt.verify(req.header("auth-token"), dev.jwt, async (err, decoded) => {
    if (err) return console.log(err);
    let UserId = decoded.id;
    const posts = await User.find({ id: UserId });
    if (!posts)
      return res.status(200).json({
        status: false,
        message: "اپلود پست با مشکل مواجه شد",
      });
    res.status(200).json({
      status: true,
      message: "عملیات با موفقیت انجام شد",
      username: decoded.username,
      data: posts,
    });
  });
});

module.exports = router;
