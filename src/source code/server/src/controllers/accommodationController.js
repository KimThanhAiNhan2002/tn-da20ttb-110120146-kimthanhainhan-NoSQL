import mongoose from 'mongoose';
import { TouristSpot } from '../model/touristSpot';

// Controller function để lấy tất cả dữ liệu accommodations của một tourist spot
const getAllAccommodations = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;

  // Kiểm tra và chuyển đổi touristSpotId thành ObjectId
  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const accommodations = touristSpot.accommodations;
    res.status(200).json(accommodations);
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy tất cả accommodations từ tất cả tourist spots
const getAllAccommodationsFromAllSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    const accommodations = touristSpots.flatMap(spot => 
      spot.accommodations.map(accommodation => ({
        ...accommodation.toObject(),
        touristSpotId: spot._id // Add the touristSpotId to each accommodation
      }))
    );
    res.status(200).json(accommodations);
  } catch (error) {
    console.error('Error fetching all accommodations:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu accommodation theo ID
const getAccommodationById = async (req, res) => {
  const accommodationId = req.params.accommodationId;

  // Kiểm tra và chuyển đổi accommodationId thành ObjectId
  if (!mongoose.Types.ObjectId.isValid(accommodationId)) {
    return res.status(400).json({ message: 'Invalid accommodation ID' });
  }

  try {
    const touristSpots = await TouristSpot.findOne({ "accommodations._id": accommodationId });
    if (!touristSpots) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    const accommodation = touristSpots.accommodations.id(accommodationId);
    res.status(200).json(accommodation);
  } catch (error) {
    console.error('Error fetching accommodation by id:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một accommodation
const createAccommodation = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const newAccommodation = req.body;

  // Kiểm tra và chuyển đổi touristSpotId thành ObjectId
  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.accommodations.push(newAccommodation);
    await touristSpot.save();
    res.status(201).json(newAccommodation);
  } catch (error) {
    console.error('Error creating accommodation:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một accommodation theo ID
const updateAccommodationById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const accommodationId = req.params.accommodationId;
  const updatedAccommodation = req.body;

  // Kiểm tra và chuyển đổi touristSpotId và accommodationId thành ObjectId
  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(accommodationId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const accommodation = touristSpot.accommodations.id(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    // Kiểm tra và thêm trường google_map nếu thiếu cho tất cả các accommodation
    touristSpot.accommodations.forEach((accommodation, index) => {
      if (!accommodation.google_map) {
        accommodation.google_map = updatedAccommodation.google_map || 'default_value'; // Giá trị mặc định hoặc giá trị từ client
      }
    });

    accommodation.set(updatedAccommodation);
    await touristSpot.save();
    res.status(200).json(accommodation);
  } catch (error) {
    console.error('Error updating accommodation:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để xóa một accommodation theo ID
const deleteAccommodationById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const accommodationId = req.params.accommodationId;

  // Kiểm tra và chuyển đổi touristSpotId và accommodationId thành ObjectId
  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(accommodationId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.accommodations = touristSpot.accommodations.filter(accommodation => accommodation._id.toString() !== accommodationId);

    await touristSpot.save();
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    console.error('Error deleting accommodation:', error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodationById,
  deleteAccommodationById,
  getAllAccommodationsFromAllSpots // Export the new function
};
