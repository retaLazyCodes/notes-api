const jwt = require("express-jwt")

module.exports = authorizeUserRole;

function authorizeUserRole(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'user') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['admin', 'user'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // middleware que desencriptan el auth token y lo guarda en req.user
    jwt({
      secret: process.env.SECRET,
      algorithms: ["HS256"],
      getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization &&
          req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer') {
          return req.headers.authorization.split(' ')[1]

        } else if (req.headers.token &&
          req.headers.token.split(' ')[0].toLowerCase() === 'bearer') {
          return req.headers.token.split(' ')[1]
        }
        return null;
      }
    }),

    // authorize based on user role
    (req, res, next) => {
      console.log("REQ.USER: ", req.user)
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }
      // authentication and authorization successful!!
      next()
    },
  ]
}

