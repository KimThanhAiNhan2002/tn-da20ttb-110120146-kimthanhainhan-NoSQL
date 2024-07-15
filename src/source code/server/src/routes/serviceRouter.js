import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
  getAllServicesFromAllSpots
} from '../controllers/serviceController';

const router = express.Router();

// Route để lấy tất cả dữ liệu services từ tất cả tourist spots
router.get('/all/services', getAllServicesFromAllSpots);

// Route để lấy tất cả dữ liệu services của một tourist spot
router.get('/:touristSpotId/services', getAllServices);

// Route để lấy dữ liệu service theo ID
router.get('/services/:serviceId', getServiceById);

// Route để tạo mới một service
router.post('/:touristSpotId/services', createService);

// Route để cập nhật thông tin của một service theo ID
router.put('/:touristSpotId/services/:serviceId', updateServiceById);

// Route để xóa một service theo ID
router.delete('/:touristSpotId/services/:serviceId', deleteServiceById);

export default router;
