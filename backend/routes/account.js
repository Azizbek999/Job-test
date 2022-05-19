import express from "express";
import User from "../models/User.js";
import authToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Get User
router.get("/find/:id", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update User
// router.patch("/find/:id", async (req, res) => {
//   console.log("1");
//   try {
//     const update = await User.findOne({ _id: req.params.id });
//     console.log(update);
//     console.log("2");
//     if (req.body.name) {
//       update.name = req.body.name;
//     }

//     if (req.body.email) {
//       update.email = req.body.email;
//     }
//     if (req.body.password) {
//       update.password = req.body.password;
//     }

//     if (req.body.photo) {
//       update.photo = req.body.photo;
//     }

//     await update.save();
//     return res.send(update);
//   } catch {
//     res.status(404);
//     return res.send({ error: "Post doesn't exist!" });
//   }
// });

router.patch("/find/:id", authToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: `Cannot find with id: ${id}` });
    } else {
      const changedUser = await user.save();
      return res.send(changedUser);
    }
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).send({ message: err });
  }
});

export default router;
