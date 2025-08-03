import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers,updateUser } from "../controllers/user.controller.js";
import User from "../models/user.model.js"; // make sure this path is correct

const userRouter = Router();

// ✅ Get all users
userRouter.get("/", getUsers);

// ✅ Get logged-in user's own profile
userRouter.get("/me", authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // optional: exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }

userRouter.put("/:id", authorize, updateUser);
// ✅ Get any user by ID (protected)
userRouter.get("/:id", authorize, getUser);

// Optional: add/update/delete user (if needed for admin use)
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
userRouter.put("/:id", authorize, updateUser);
userRouter.delete("/:id", authorize, (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
