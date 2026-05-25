const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");

async function authMiddle(req, res, next) {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const isBlacklisted = await blacklistModel.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({
            message : "Token is blacklisted"
        })
    }
    

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = authMiddle;