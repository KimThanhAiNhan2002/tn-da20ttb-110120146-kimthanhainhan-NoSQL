import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
  getAllRestaurantsFromAllSpots
} from '../controllers/restaurantController';

const router = express.Router();

// Route để lấy tất cả dữ liệu restaurants từ tất cả tourist spots
router.get('/all/restaurants', getAllRestaurantsFromAllSpots);

// Route để lấy tất cả dữ liệu restaurants của một tourist spot
router.get('/:touristSpotId/restaurants', getAllRestaurants);

// Route để lấy dữ liệu restaurant theo ID
router.get('/restaurants/:restaurantId', getRestaurantById);

// Route để tạo mới một restaurant
router.post('/:touristSpotId/restaurants', createRestaurant);

// Route để cập nhật thông tin của một restaurant theo ID
router.put('/:touristSpotId/restaurants/:restaurantId', updateRestaurantById);

// Route để xóa một restaurant theo ID
router.delete('/:touristSpotId/restaurants/:restaurantId', deleteRestaurantById);

export default router;
