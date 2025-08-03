import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import User from "../models/user.model.js";

const userRouter = Router();

// ✅ Get all users
userRouter.get("/", getUsers);

// ✅ Get current logged-in user
userRouter.get("/me", authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ✅ Get a user by ID
userRouter.get("/:id", authorize, getUser);

// ✅ Update user (bio or other fields)
userRouter.put("/:id", authorize, updateUser);

// ❌ OPTIONAL: Unused routes for demonstration (remove if not needed)
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
