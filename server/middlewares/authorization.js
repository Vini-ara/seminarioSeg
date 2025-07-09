import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      var decoded = jwt.verify(token, process.env.JWT_AT_SECRET_KEY);

      console.log("Decoded JWT:", decoded);

      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      res.status(403).json({ message: err.message });
    }
  } else {
    res.status(403).json({ message: "Not authorized get Resource" });
  }
}
