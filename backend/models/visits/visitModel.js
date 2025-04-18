const mongoose = require('mongoose')
const Visit = require('./visitSchema')

module.exports = {
    visitCount: async (req, res) => {
        const ip =
            req.headers['x-forwarded-for']?.split(',').shift() ||
            req.socket?.remoteAddress ||
            req.ip;

        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        try {
            let visit = await Visit.findOne();

            if (!visit) {
                visit = new Visit({
                    count: 1,
                    visitorsByDate: [{ date: today, ips: [ip] }],
                });
            } else {
                let entry = visit.visitorsByDate.find(e => e.date === today);

                if (!entry) {
                    // No entry for today yet
                    visit.count += 1;
                    visit.visitorsByDate.push({ date: today, ips: [ip] });
                } else if (!entry.ips.includes(ip)) {
                    // New IP for today
                    entry.ips.push(ip);
                    visit.count += 1;
                }
            }

            await visit.save();

            console.log('Visit count:', visit.count);

            res.send(`<h1>Welcome!</h1><p>This site has been visited by ${visit.count} unique IPs.</p>`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Something went wrong');
        }
    }
}