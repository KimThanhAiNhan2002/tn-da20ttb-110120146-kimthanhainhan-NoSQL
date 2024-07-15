import { TouristSpot } from '../model/touristSpot'; // Import model TouristSpot

// Controller function để lấy tất cả dữ liệu địa điểm du lịch
const getAllTouristSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    res.status(200).json(touristSpots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu địa điểm du lịch theo ID
const getTouristSpotById = async (req, res) => {
  const { id } = req.params;
  try {
    const touristSpot = await TouristSpot.findById(id);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm du lịch' });
    }
    res.status(200).json(touristSpot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một địa điểm du lịch
const createTouristSpot = async (req, res) => {
  const touristSpot = req.body;
  try {
    const createdTouristSpot = await TouristSpot.create(touristSpot);
    res.status(201).json(createdTouristSpot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một địa điểm du lịch theo ID
const updateTouristSpotById = async (req, res) => {
  const { id } = req.params;
  const updatedTouristSpot = req.body;
  try {
    const existingTouristSpot = await TouristSpot.findById(id);
    if (!existingTouristSpot) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm du lịch để cập nhật' });
    }

    // Bảo toàn các trường lồng nhau nếu chúng không được cung cấp trong yêu cầu
    const updatedFields = {
      name: updatedTouristSpot.name || existingTouristSpot.name,
      description: updatedTouristSpot.description || existingTouristSpot.description,
      address: updatedTouristSpot.address || existingTouristSpot.address,
      image: updatedTouristSpot.image || existingTouristSpot.image,
      category: updatedTouristSpot.category || existingTouristSpot.category,
      google_map: updatedTouristSpot.google_map || existingTouristSpot.google_map,
      accommodations: updatedTouristSpot.accommodations.length ? updatedTouristSpot.accommodations : existingTouristSpot.accommodations,
      restaurants: updatedTouristSpot.restaurants.length ? updatedTouristSpot.restaurants : existingTouristSpot.restaurants,
      specialties: updatedTouristSpot.specialties.length ? updatedTouristSpot.specialties : existingTouristSpot.specialties,
      services: updatedTouristSpot.services.length ? updatedTouristSpot.services : existingTouristSpot.services,
      souvenirs: updatedTouristSpot.souvenirs.length ? updatedTouristSpot.souvenirs : existingTouristSpot.souvenirs
    };

    const result = await TouristSpot.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function để xóa một địa điểm du lịch theo ID
const deleteTouristSpotById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TouristSpot.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm du lịch để xóa' });
    }
    res.status(200).json({ message: 'Đã xóa địa điểm du lịch thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function để tìm kiếm địa điểm du lịch theo tên
const searchTouristSpots = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await TouristSpot.find({
      name: { $regex: query, $options: 'i' }
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tìm kiếm địa điểm du lịch theo địa chỉ
const searchTouristSpotsByAddress = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await TouristSpot.find({
      address: { $regex: query, $options: 'i' }
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function để tìm kiếm địa điểm du lịch theo tọa độ
const searchTouristSpotsByCoordinates = async (req, res) => {
  const { lng, lat } = req.query;
  try {
    const results = await TouristSpot.find({
      google_map: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], 10 / 6378.1] // 10 km radius
        }
      }
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function để lọc địa điểm du lịch theo danh mục
const getTouristSpotsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const results = await TouristSpot.find({ category: { $regex: category, $options: 'i' } });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function để lấy tất cả danh mục
const getCategories = async (req, res) => {
  try {
    const categories = await TouristSpot.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
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
};