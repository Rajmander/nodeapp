import User from "../user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([{ $match: {} }]);
    return res.json({ msg: users });
  } catch (e) {
    return res.json({ data: e.message });
  }
};

export const demo = (req, res, next) => {
  res.json({ msg: "demo" });
};
