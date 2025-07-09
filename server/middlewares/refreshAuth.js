import jwt from "jsonwebtoken";
import { CookieUtils } from "../utils/cookie.utils.js";

export default function (req, res, next) {
  const token = CookieUtils.getCookieValue(req, 'refreshToken');

  if (token) {
    try {
      var decoded = jwt.verify(token, process.env.JWT_RT_SECRET_KEY);

      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      res.status(401).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Not authorized get Resource" });
  }
}
