import express from 'express';
import {
  getAllSpecialties,
  getSpecialtyById,
  createSpecialty,
  updateSpecialtyById,
  deleteSpecialtyById,
  getAllSpecialtiesFromAllSpots
} from '../controllers/specialtyController';

const router = express.Router();

// Route để lấy tất cả dữ liệu specialties từ tất cả tourist spots
router.get('/all/specialties', getAllSpecialtiesFromAllSpots);

// Route để lấy tất cả dữ liệu specialties của một tourist spot
router.get('/:touristSpotId/specialties', getAllSpecialties);

// Route để lấy dữ liệu specialty theo ID
router.get('/specialties/:specialtyId', getSpecialtyById);

// Route để tạo mới một specialty
router.post('/:touristSpotId/specialties', createSpecialty);

// Route để cập nhật thông tin của một specialty theo ID
router.put('/:touristSpotId/specialties/:specialtyId', updateSpecialtyById);

// Route để xóa một specialty theo ID
router.delete('/:touristSpotId/specialties/:specialtyId', deleteSpecialtyById);

export default router;
