const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {

  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {

    const decoded = jwt.verify(token, "mysecretkey58963");
    req.verifieduser = decoded;  
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
