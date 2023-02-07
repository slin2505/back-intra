import jwt from "jsonwebtoken";
import User from "../models/User.js";

// On récupère le token dans le header de la requete et on vérifie l'userId
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.passwordToken);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ err: err | "Requête non authentifiée !" });
  }
};

export default auth;
