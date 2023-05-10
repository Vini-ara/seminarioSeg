import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = decoded;
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized get Resource" });
  }

  next();
}
