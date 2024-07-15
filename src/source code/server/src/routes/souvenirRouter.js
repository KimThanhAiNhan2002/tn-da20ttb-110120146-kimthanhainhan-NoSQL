import express from 'express';
import {
  getAllSouvenirs,
  getSouvenirById,
  createSouvenir,
  updateSouvenirById,
  deleteSouvenirById,
  getAllSouvenirsFromAllSpots
} from '../controllers/souvenirController';

const router = express.Router();

// Route để lấy tất cả dữ liệu souvenirs từ tất cả tourist spots
router.get('/all/souvenirs', getAllSouvenirsFromAllSpots);

// Route để lấy tất cả dữ liệu souvenirs của một tourist spot
router.get('/:touristSpotId/souvenirs', getAllSouvenirs);

// Route để lấy dữ liệu souvenir theo ID
router.get('/:touristSpotId/souvenirs/:souvenirId', getSouvenirById); // Đảm bảo định nghĩa đúng

// Route để tạo mới một souvenir
router.post('/:touristSpotId/souvenirs', createSouvenir);

// Route để cập nhật thông tin của một souvenir theo ID
router.put('/:touristSpotId/souvenirs/:souvenirId', updateSouvenirById);

// Route để xóa một souvenir theo ID
router.delete('/:touristSpotId/souvenirs/:souvenirId', deleteSouvenirById);

export default router;
