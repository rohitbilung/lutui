const axios = require('axios');
require('dotenv').config();

module.exports = {
    trackingApi: async (data) => {

        try {
            const response = await axios.post(
                process.env.TRACKING_URL,
                {
                    tracking_number: data.tracking_number,
                    carrier_code: 'india-post'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Tracking-Api-Key': process.env.TRACKING_API_KEY
                    }
                }
            );

            return response;
        } catch (error) {
            res.status(500).json({ error: 'Error fetching weather data' });
        }
    },

    
}