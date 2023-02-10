import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = (req, res) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
};

export const getUserById = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json({ err }));
};

export const updateUser = (req, res) => {
  let userProfile = null;

  userProfile = {
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
    password: req.body.password,
    is_admin: req.body.isAdmin,
  };

  // on hash le password si celle ci existe
  if (userProfile.password !== undefined) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      userProfile.password = hash;
      User.update(userProfile, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Profile modifié." }))
        .catch((err) => res.status(400).json({ err }));
    });
  } else {
    // mise à jour de l'utilisateur
    User.update(userProfile, { where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Profile modifié." }))
      .catch((err) => res.status(400).json({ err }));
  }
};

export const deleteUser = (req, res) => {
  User.findOne(
    { where: { id: req.params.id } },
    { attributes: { exclude: ["password"] } }
  )
    .then(() => {
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé." }))
        .catch((err) => res.status(404).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};
