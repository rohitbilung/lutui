const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel/user.schema");

const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies && req.cookies['lutui-auth-token'];
    if (token === undefined) {
      token = req.headers.token || req.body.headers.Cookie;
    }
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "You should be logged in to perform this action.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded)
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exists." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error: ", error)
    return res.status(401).json({
      success: false,
      message:
        "Invalid token. Please refresh the page and try logging in again.",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized for this action.",
    });
  }
  next();
};

const isProvider = (req, res, next) => {
  if (req.user.role !== "provider") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized for this action.",
    });
  }
  next();
};

const isManager = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized for this action.",
    });
  }
  next();
};

const isNotAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return res.status(401).json({
      success: false,
      message: "You are not authorized for this action.",
    });
  }
  next();
};

const isAdminOrManager = (req, res, next) => {
  if (!['admin', 'manager'].includes(req.user.role)) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized for this action.",
    });
  }
  next();
};

module.exports = { isLoggedIn, isAdmin, isNotAdmin, isProvider, isManager, isAdminOrManager };