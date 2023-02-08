import jwt from "jsonwebtoken";
import User from "../models/User.js";

// On récupère le token dans le header de la requete et on vérifie l'userId
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.passwordToken);
    const userId = decodedToken.userId;

    User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ err: "Authentification requise !" });
        } else {
          next();
        }
      })
      .catch((err) => res.status(404).json({ err }));
  } catch (err) {
    res.status(401).json("Requête non authentifiée !");
  }
};

export default auth;
