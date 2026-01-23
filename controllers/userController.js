import User from "../user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.json({ data: user });
  } catch (e) {
    return res.json({ data: [] });
  }
};

export const demo = (req, res, next) => {
  res.json({ msg: "demo" });
};
