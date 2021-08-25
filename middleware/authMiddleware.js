const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized");
    }
    const { userId } = jwt.verify(req.headers.authorization, process.env.jwtSecret);
    //we destructured userId bc in auth.js, we added userId to the payload while signing the token

    req.userId = userId; //we added userId property to the req
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Unauthorized");
  }
};
