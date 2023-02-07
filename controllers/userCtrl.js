import User from "../models/User.js";

export const getAllUsers = (req, res) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((users) => {
      users.forEach((user) => {
        const imageUrl = user.photo;
        const newImageUrl = `${req.protocol}://${req.get("host")}/${imageUrl}`;
        user.photo = newImageUrl;
      });
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json(err));
};

export const getUserById = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
  })
    .then((user) => {
      const imageUrl = user.photo;
      const newImageUrl = `${req.protocol}://${req.get("host")}/${imageUrl}`;
      user.photo = newImageUrl;
      res.status(200).json({ user });
    })
    .catch((err) => res.status(404).json({ err }));
};

export const updateUser = (req, res) => {};

export const deleteUser = (req, res) => {};
