import db  from "../models/index.js";
const Session = db.session;
const User = db.user;

const authenticate = (req, res, next) => {
  let token = null;
 
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findOne({ where: { token: token } })
        .then(async (session) => {
          if (!session)
            return res.status(401).send({ message: "Unauthorized! Invalid Token" });

          if (session.expirationDate < Date.now()) {
            return res.status(401).send({
              message: "Unauthorized! Expired Token, Logout and Login again",
            });
          }

          try {
            const user = await User.findByPk(session.userId);
            if (!user)
              return res.status(401).send({ message: "Unauthorized! User not found" });
            req.user = user; // attach authenticated user
            next();
          } catch (e) {
            return res.status(500).send({ message: e.message || "Auth error" });
          }
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(500).send({ message: err.message || "Auth error" });
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

//test

export default authenticate;
