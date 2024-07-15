import mongoose from 'mongoose';
import { TouristSpot } from '../model/touristSpot';

// Controller function để lấy tất cả dữ liệu souvenirs của một tourist spot
const getAllSouvenirs = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const souvenirs = touristSpot.souvenirs;
    res.status(200).json(souvenirs);
  } catch (error) {
    console.error('Error fetching souvenirs:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy tất cả souvenirs từ tất cả tourist spots
const getAllSouvenirsFromAllSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    const souvenirs = touristSpots.flatMap(spot =>
      spot.souvenirs.map(souvenir => ({
        ...souvenir.toObject(),
        touristSpotId: spot._id
      }))
    );
    res.status(200).json(souvenirs);
  } catch (error) {
    console.error('Error fetching all souvenirs:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu souvenir theo ID
const getSouvenirById = async (req, res) => {
  const { souvenirId, touristSpotId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(souvenirId) || !mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findOne({ _id: touristSpotId, "souvenirs._id": souvenirId });
    if (!touristSpot) {
      return res.status(404).json({ message: 'Souvenir not found' });
    }

    const souvenir = touristSpot.souvenirs.id(souvenirId);
    res.status(200).json(souvenir);
  } catch (error) {
    console.error('Error fetching souvenir by id:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một souvenir
const createSouvenir = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const newSouvenir = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.souvenirs.push(newSouvenir);
    await touristSpot.save();
    res.status(201).json(newSouvenir);
  } catch (error) {
    console.error('Error creating souvenir:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một souvenir theo ID
const updateSouvenirById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const souvenirId = req.params.souvenirId;
  const updatedSouvenir = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(souvenirId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const souvenir = touristSpot.souvenirs.id(souvenirId);
    if (!souvenir) {
      return res.status(404).json({ message: 'Souvenir not found' });
    }

    souvenir.set(updatedSouvenir);
    await touristSpot.save();
    res.status(200).json(souvenir);
  } catch (error) {
    console.error('Error updating souvenir:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để xóa một souvenir theo ID
const deleteSouvenirById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const souvenirId = req.params.souvenirId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(souvenirId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.souvenirs = touristSpot.souvenirs.filter(souvenir => souvenir._id.toString() !== souvenirId);

    await touristSpot.save();
    res.status(200).json({ message: 'Souvenir deleted successfully' });
  } catch (error) {
    console.error('Error deleting souvenir:', error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllSouvenirs,
  getSouvenirById,
  createSouvenir,
  updateSouvenirById,
  deleteSouvenirById,
  getAllSouvenirsFromAllSpots
};
