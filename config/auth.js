const jwt = require("jsonwebtoken");
const User = require("../models/users");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || "lkajdsfiwe",
    {
      expiresIn: "30d",
    }
  );
};

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "lkajdsfiwe");

      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(202).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(202).json({ message: "Not authorized, token failed" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(202).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { generateToken, protect, admin };
