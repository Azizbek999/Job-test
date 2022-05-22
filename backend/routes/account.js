import express from "express";
import User from "../models/User.js";
import authToken from "../middleware/authenticateToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Get User
router.get("/find/:id", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // const { password, ...others } = user._doc;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.patch("/find/:id", authToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      
      return res.status(404).send({ message: `Cannot find with id: ${id}` });
    } else {
      const changedUser = await user.save();
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SEC,
        {
          expiresIn: "1 days",
        }
      );
      const { password, ...others } = changedUser._doc;

      return res.status(200).json({ ...others, accessToken });
      // return res.send(changedUser);
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});


router.delete("/find/:id", authToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
