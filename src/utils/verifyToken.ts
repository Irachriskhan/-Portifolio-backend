import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as Secret, (err: any, user: any) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    // Assuming `user` contains the decoded token
    req.user = user;
    next(); // don't forget to call next
  });
};


const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "user") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not authenticated" });
    }
  });
};

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not authorized" });
    }
  });
};

export { verifyAdmin, verifyUser, verifyToken };