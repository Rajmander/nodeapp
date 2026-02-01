import User from "../user.model.js";

// ********** Demo insertMany ********** //
export const demoInsertMany = async (req, res, next) => {
  await User.insertMany([
    {
      username: "singh2",
      email: "singh2@gmail.com",
      password: "112244",
      mobile: 7777777778,
      salary: 500,
      roles: "manager",
    },
    {
      username: "singh3",
      email: "singh3@gmail.com",
      password: "112255",
      mobile: 7777777779,
      salary: 5009,
      roles: "manager",
    },
    {
      username: "singh4",
      email: "singh4@gmail.com",
      password: "11224455",
      mobile: 7777777775,
      salary: 5000,
      roles: "customer",
    },
    {
      username: "singh5",
      email: "singh5@gmail.com",
      password: "112266",
      mobile: 7777777776,
      salary: 10500,
      roles: "manager",
    },
  ]);
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          totalActive: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          InActive: {
            $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
          },
          activeTotalSalary: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, "$salary", 0] },
          },
          inActiveTotalSalary: {
            $sum: { $cond: [{ $eq: ["$isActive", false] }, "$salary", 0] },
          },
          totalManagersSalary: {
            $sum: { $cond: [{ $eq: ["$roles", "manager"] }, "$salary", 0] },
          },
        },
      },
    ]);
    return res.json({ msg: users });
  } catch (e) {
    return res.json({ data: e.message });
  }
};

export const demoMatchStage = async (request, response, next) => {
  const allData = await User.aggregate([
    {
      $match: {
        createdAt: { $gt: new Date("2026-01-18"), $lt: new Date("2026-02-28") },
      },
    },
  ]);

  response.json({ data: allData });
};

export const demo = (req, res, next) => {
  res.json({ msg: "demo" });
};
