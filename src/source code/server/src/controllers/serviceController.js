import mongoose from 'mongoose';
import { TouristSpot } from '../model/touristSpot';

// Controller function để lấy tất cả dữ liệu services của một tourist spot
const getAllServices = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const services = touristSpot.services;
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy tất cả services từ tất cả tourist spots
const getAllServicesFromAllSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    const services = touristSpots.flatMap(spot => 
      spot.services.map(service => ({
        ...service.toObject(),
        touristSpotId: spot._id
      }))
    );
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching all services:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu service theo ID
const getServiceById = async (req, res) => {
  const serviceId = req.params.serviceId;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: 'Invalid service ID' });
  }

  try {
    const touristSpot = await TouristSpot.findOne({ "services._id": serviceId });
    if (!touristSpot) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const service = touristSpot.services.id(serviceId);
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service by id:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một service
const createService = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const newService = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId)) {
    return res.status(400).json({ message: 'Invalid tourist spot ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.services.push(newService);
    await touristSpot.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một service theo ID
const updateServiceById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const serviceId = req.params.serviceId;
  const updatedService = req.body;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    const service = touristSpot.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.set(updatedService);
    await touristSpot.save();
    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function để xóa một service theo ID
const deleteServiceById = async (req, res) => {
  const touristSpotId = req.params.touristSpotId;
  const serviceId = req.params.serviceId;

  if (!mongoose.Types.ObjectId.isValid(touristSpotId) || !mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const touristSpot = await TouristSpot.findById(touristSpotId);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Tourist spot not found' });
    }

    touristSpot.services = touristSpot.services.filter(service => service._id.toString() !== serviceId);

    await touristSpot.save();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
  getAllServicesFromAllSpots
};
