const getCoordinates = async (req, res, next) => {
    const location = req.body?.listing?.location;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const apiKey = process.env.MAP_TOKEN;
        const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}`);

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to fetch from MapTiler' });
        }

        const data = await response.json();
        const coordinates = data.features[0]?.geometry?.coordinates;

        if (!coordinates) {
            return res.status(404).json({ error: 'Coordinates not found' });
        }


        req.coordinates = {
            longitude: coordinates[0],
            latitude: coordinates[1],
        };

        //console.log(`✅ Coordinates for ${location}:`, req.coordinates);

        next();
    } catch (err) {
        console.error('❌ Error fetching coordinates:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export default getCoordinates;
