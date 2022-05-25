import express from "express";
import User from "../models/User.js";
import authToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Get All Users
router.get("/", authToken, async (req, res) => {
  try {
    const allUsers = await User.find();
    // allUsers = allUsers.map((a) => (delete a.password));
    const Users = [];
    allUsers.forEach((item) => {
      Users.push({
        _id: item._id,
        name: item.name,
        email: item.email,
        photo: item.photo,
        gender: item.gender,
        birthDate: item.birthDate,
      });
    });
    // console.log(Users);

    return res.status(200).json(Users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
