import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()


export const generateTokenandSetCookie = (id, res) => {
  try {
    const cookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    };
    const Token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
    res.cookie("jwt", Token, cookieOptions);
    return Token;
  } catch (error) {
    console.log("Error generating token", error);
    return res.json({
      success: false,
      message: "Error generating token",
    });
  }
};
