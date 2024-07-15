import mongoose from 'mongoose';
import { TouristSpot } from '../model/touristSpot';

// Controller function để lấy tất cả dữ liệu specialties của một tourist spot
const getAllSpecialties = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const specialties = touristSpot.specialties;
    res.status(200).json(specialties);
  } catch (error) {
    console.error('Error fetching specialties:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy tất cả specialties từ tất cả tourist spots
const getAllSpecialtiesFromAllSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    const specialties = touristSpots.flatMap(spot => 
      spot.specialties.map(specialty => ({
        ...specialty.toObject(),
        touristSpotId: spot._id
      }))
    );
    res.status(200).json(specialties);
  } catch (error) {
    console.error('Error fetching all specialties:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu specialty theo ID
const getSpecialtyById = async (req, res) => {
  const specialtyId = req.params.specialtyId;

  if (!mongoose.Types.ObjectId.isValid(specialtyId)) {
    return res.status(400).json({ message: 'Invalid specialty ID' });
  }

  try {
    const touristSpot = await TouristSpot.findOne({ "specialties._id": specialtyId });
    if (!touristSpot) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    const specialty = touristSpot.specialties.id(specialtyId);
    res.status(200).json(specialty);
  } catch (error) {
    console.error('Error fetching specialty by id:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một specialty
const createSpecialty = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const newSpecialty = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.specialties.push(newSpecialty);
    await touristSpot.save();
    res.status(201).json(newSpecialty);
  } catch (error) {
    console.error('Error creating specialty:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một specialty theo ID
const updateSpecialtyById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const specialtyId = req.params.specialtyId;
  const updatedSpecialty = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(specialtyId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const specialty = touristSpot.specialties.id(specialtyId);
    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    specialty.set(updatedSpecialty);
    await touristSpot.save();
    res.status(200).json(specialty);
  } catch (error) {
    console.error('Error updating specialty:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để xóa một specialty theo ID
const deleteSpecialtyById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const specialtyId = req.params.specialtyId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(specialtyId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.specialties = touristSpot.specialties.filter(specialty => specialty._id.toString() !== specialtyId);

    await touristSpot.save();
    res.status(200).json({ message: 'Specialty deleted successfully' });
  } catch (error) {
    console.error('Error deleting specialty:', error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllSpecialties,
  getSpecialtyById,
  createSpecialty,
  updateSpecialtyById,
  deleteSpecialtyById,
  getAllSpecialtiesFromAllSpots
};
