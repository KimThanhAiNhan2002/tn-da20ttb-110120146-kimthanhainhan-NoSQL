//accommodationRouter.js
import express from 'express';
import {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodationById,
  deleteAccommodationById,
  getAllAccommodationsFromAllSpots // New controller function to get all accommodations
} from '../controllers/accommodationController';

const router = express.Router();

// Route để lấy tất cả dữ liệu accommodations từ tất cả tourist spots
router.get('/all/accommodations', getAllAccommodationsFromAllSpots);

// Route để lấy tất cả dữ liệu accommodations của một tourist spot
router.get('/:touristSpotId/accommodations', getAllAccommodations);

// Route để lấy dữ liệu accommodation theo ID
router.get('/accommodations/:accommodationId', getAccommodationById);

// Route để tạo mới một accommodation
router.post('/:touristSpotId/accommodations', createAccommodation);

// Route để cập nhật thông tin của một accommodation theo ID
router.put('/:touristSpotId/accommodations/:accommodationId', updateAccommodationById);

// Route để xóa một accommodation theo ID
router.delete('/:touristSpotId/accommodations/:accommodationId', deleteAccommodationById);

export default router;
