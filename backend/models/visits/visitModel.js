const mongoose = require("mongoose");
const Visit = require("./visitSchema");

module.exports = {
  visitCount: async (req, res) => {
    const ip =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress ||
      req.ip;

    const today = new Date().toISOString().split("T")[0];

    try {
      // Find today's document
      let visit = await Visit.findOne({ date: today });

      if (!visit) {
        // First visitor of the day
        visit = new Visit({
          date: today,
          count: 1,
          ips: [ip],
        });
      } else if (!visit.ips.includes(ip)) {
        // New IP for today
        visit.ips.push(ip);
        visit.count += 1;
      }

      await visit.save();

      console.log("Today's visit count:", visit.count);

      res.json({
        success: true,
        date: today,
        count: visit.count,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },
};