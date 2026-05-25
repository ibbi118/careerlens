const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")


async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Email, Username and Password are required",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists with this email or username",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}


async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or Password are Required",
      });
    }

    const findUser = await userModel
      .findOne({ email })
      .select("+password");

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await findUser.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: findUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}


async function getMe(req, res) {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "User Fetched Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}


async function logoutUser(req, res) {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(400).json({
        message: "Token not provided",
      });
    }       
    await blacklistModel.create({ token });

    res.clearCookie("token");   
    return res.status(200).json({
      message: "User logged out successfully",
    }); 
    } catch (err) {
    return res.status(500).json({
        message: err.message,
    });
  }

}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}