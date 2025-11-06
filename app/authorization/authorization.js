import db  from "../models/index.js";
const Session = db.session;

const authenticate = (req, res, next) => {
  let token = null;
 
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          if (!session) {
            return res.status(401).send({
              message: "Unauthorized! Invalid token",
            });
          }
          
          if (session.expirationDate >= Date.now()) {
            req.userId = session.userId; // Pass user ID to the next middleware
            next();
            return;
          } else {
            return res.status(401).send({
              message: "Unauthorized! Expired Token, Logout and Login again",
            });
          }
        })
        .catch((err) => {
          console.error("Authentication error:", err.message);
          return res.status(500).send({
            message: "Error checking authentication",
          });
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};



export default authenticate;
