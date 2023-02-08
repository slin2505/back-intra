import User from "../models/User.js";

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.passwordToken);
    const userId = decodedToken.userId;

    User.findOne({
      where: { id: userId },
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
    res.status(401).json("Requête non authentifiée !");
  }
};

export default isAdmin;
