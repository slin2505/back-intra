import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = (req, res) => {
  if (req.body.password === undefined) {
    return res.status(400).json({ err });
  }
  // hash password création de l'objet newUser
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = {
        email: req.body.email,
        last_name: req.body.lastName,
        first_name: req.body.firstName,
        gender: req.body.gender,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        birthdate: req.body.birthdate,
        category: req.body.category,
        photo: req.body.photo,
        password: hash,
      };

      // création de l'utilisateur
      User.create(newUser)
        .then(() => res.status(201).json({ message: "Compte crée" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

export const signIn = (req, res) => {
  // On récupère l'utilisateur dans la BDD et on compare les passwords

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ err: "Utilisateur inexistant !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ err: "Mot de passe incorrect !" });
            } else {
              return res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  process.env.passwordToken,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((err) => res.status(500).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
