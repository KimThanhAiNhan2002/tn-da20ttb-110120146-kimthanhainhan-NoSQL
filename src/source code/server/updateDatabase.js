import { connect } from './src/config/connectDB';
import { TouristSpot } from './src/model/touristSpot';

async function updateDatabase() {
  await connect();

  try {
    const touristSpots = await TouristSpot.find();

    for (let spot of touristSpots) {
      let updated = false;

      for (let accommodation of spot.accommodations) {
        if (!accommodation.google_map) {
          accommodation.google_map = 'default_google_map_value'; // Thay thế bằng giá trị thực tế
          updated = true;
        }
      }

      for (let restaurant of spot.restaurants) {
        if (!restaurant.google_map) {
          restaurant.google_map = 'default_google_map_value'; // Thay thế bằng giá trị thực tế
          updated = true;
        }
      }

      if (updated) {
        await spot.save();
        console.log(`Updated tourist spot: ${spot._id}`);
      }
    }

    console.log('Database update completed.');
  } catch (error) {
    console.error('Error updating database:', error);
  }
}

updateDatabase();
