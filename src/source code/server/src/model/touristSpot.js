const mongoose = require('mongoose');

const touristSpotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    google_map: { type: String, required: true },
    accommodations: [{
        name: { type: String, required: true },
        price: { type: String, required: true },
        address: { type: String, required: true },
        phone_number: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        google_map: { type: String, required: true }
    }],
    restaurants: [{
        name: { type: String, required: true },
        price: { type: String, required: true },
        address: { type: String, required: true },
        phone_number: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        google_map: { type: String, required: true }
    }],
    specialties: [{
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        origin: { type: String, required: true },
        expired: { type: String, required: true },
        image: { type: String, required: true }
    }],
    services: [{
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }
    }],
    souvenirs: [{
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }
    }]
});

const TouristSpot = mongoose.model('TouristSpot', touristSpotSchema);

module.exports = { TouristSpot };
