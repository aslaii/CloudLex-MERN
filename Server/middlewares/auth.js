const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let accessToken = req.cookies.jwt;

  console.log("Token:", accessToken);

  // if there is no token in the cookies, request is unauthorized
  if (!accessToken) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }

  let payload;
  try {
    // verify the token jwt.verify
    // throws an error if the token has expired or has an invalid signature
    payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log("Payload:", payload);
    req._id = payload._id;

    next();
  } catch (e) {
    console.log("Token verification error:", e);
    // return req unauthorized error
    return res.status(403).json({
      error: "Unauthorized",
    });
  }
};
