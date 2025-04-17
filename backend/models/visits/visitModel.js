const mongoose = require("mongoose");
const Visit = require("./visitSchema");

module.exports = {
  visitCount: async (req, res) => {
    const ip =
      req.headers["x-forwarded-for"]?.split(",").shift() ||
      req.socket?.remoteAddress ||
      req.ip;

    try {
      let visit = await Visit.findOne();

      if (!visit) {
        visit = new Visit({
          count: 1,
          visitors: [ip],
        });
      } else {
        if (!visit.visitors.includes(ip)) {
          visit.count += 1;
          visit.visitors.push(ip);
        }
      }

      await visit.save();

      // Optional: log the current count
      console.log("Visit count:", visit.count);

      // Serve your page (HTML, EJS, static file, etc.)
      return res
        .status(200)
        .json({
          success: true,
          message: `This site has been visited by ${visit.count} people.`,
        });
      // or: res.render('home', { count: visit.count });
      // or: res.sendFile(path.join(__dirname, 'public/index.html'));
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Something went wrong in the server." });
    }
  },
};
