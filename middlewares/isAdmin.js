import User from "../models/User.js";

const isAdmin = (req, res, next) => {
  try {
    User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
    })
      .then((user) => {
        const isUserAdmin = user.isAdmin;
        if (isUserAdmin === false) {
          throw "Action non autorisée !";
        } else {
          next();
        }
      })
      .catch((err) => res.status(404).json({ err }));
  } catch (err) {
    res.status(401).json({ err: err | "Requête non authentifiée !" });
  }
};

export default isAdmin;
