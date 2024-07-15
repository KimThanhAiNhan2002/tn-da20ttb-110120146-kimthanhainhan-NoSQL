import express from 'express';
import {
  getAllTouristSpots,
  getTouristSpotById,
  createTouristSpot,
  updateTouristSpotById,
  deleteTouristSpotById,
  searchTouristSpots,
  searchTouristSpotsByAddress,
  searchTouristSpotsByCoordinates,
  getTouristSpotsByCategory,
  getCategories
} from '../controllers/touristSpotController';

const router = express.Router();
// Route để lấy tất cả danh mục
router.get('/categories', getCategories);
// Route để tìm kiếm địa điểm du lịch theo tên
router.get('/search', searchTouristSpots);
router.get('/tourist-spots/category/:category', getTouristSpotsByCategory);
// Route để tìm kiếm địa điểm du lịch theo địa chỉ
router.get('/searchByAddress', searchTouristSpotsByAddress); 
// Route để tìm kiếm địa điểm du lịch theo tọa độ
router.get('/searchByCoordinates', searchTouristSpotsByCoordinates);
// Các route khác...
router.get('/tourist-spots', getAllTouristSpots);
router.get('/tourist-spots/:id', getTouristSpotById);
router.post('/tourist-spots', createTouristSpot);
router.put('/tourist-spots/:id', updateTouristSpotById);
router.delete('/tourist-spots/:id', deleteTouristSpotById);

export default router;
