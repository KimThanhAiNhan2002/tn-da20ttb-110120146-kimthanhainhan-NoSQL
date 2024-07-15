import mongoose from 'mongoose';
import { TouristSpot } from '../model/touristSpot';

// Controller function để lấy tất cả dữ liệu restaurants của một tourist spot
const getAllRestaurants = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const restaurants = touristSpot.restaurants;
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy tất cả restaurants từ tất cả tourist spots
const getAllRestaurantsFromAllSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    const restaurants = touristSpots.flatMap(spot => 
      spot.restaurants.map(restaurant => ({
        ...restaurant.toObject(),
        touristSpotId: spot._id
      }))
    );
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching all restaurants:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu restaurant theo ID
const getRestaurantById = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
    return res.status(400).json({ message: 'Invalid restaurant ID' });
  }

  try {
    const touristSpot = await TouristSpot.findOne({ "restaurants._id": restaurantId });
    if (!touristSpot) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const restaurant = touristSpot.restaurants.id(restaurantId);
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant by id:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một restaurant
const createRestaurant = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const newRestaurant = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.restaurants.push(newRestaurant);
    await touristSpot.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một restaurant theo ID
const updateRestaurantById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const restaurantId = req.params.restaurantId;
  const updatedRestaurant = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(restaurantId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const restaurant = touristSpot.restaurants.id(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.set(updatedRestaurant);
    await touristSpot.save();
    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để xóa một restaurant theo ID
const deleteRestaurantById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const restaurantId = req.params.restaurantId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(restaurantId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.restaurants = touristSpot.restaurants.filter(restaurant => restaurant._id.toString() !== restaurantId);

    await touristSpot.save();
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
  getAllRestaurantsFromAllSpots
};
