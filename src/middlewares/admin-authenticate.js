const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // console.log(authorization)
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(createError("unauthenticated", 401));
    }
    // console.log('Authorization Passed')
    const token = authorization.split(" ")[1];
    // console.log(`this is token:  ${token}`)
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "DefaultIfnotfoundJWT_SECRET_KEY"
    );
    // console.log(payload);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    // console.log(`This line is from prisma.user ${user}`);
    if (!user) {
      return next(createError("unauthenticated", 401));
    }
    if (user.role !== "ADMIN") {
      return next(createError("You are not ADMIN", 401));
    }
    delete user.password;
    req.user = user;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(`first line ${err}`);
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      err.statusCode = 401;
    }
    next(err);
  }
};
