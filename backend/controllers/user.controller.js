import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateTokenandSetCookie} from "../utils/token.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }
    const token = generateTokenandSetCookie(existingUser._id, res);

    return res
      .status(200)
      .json({ success: true, message: "Welcome User!", token });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    const token = generateTokenandSetCookie(newUser._id, res);

    return res
      .status(201)
      .json({ success: true, message: "User created successfully!" ,token});
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
