import axios from 'axios';

const API_URL = 'http://localhost:5000/api/touristSpots'; // Đảm bảo URL này đúng với URL của server

export const getServices = async (touristSpotId) => {
  try {
    const response = await axios.get(`${API_URL}/${touristSpotId}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/all/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

export const getServiceById = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service by id:', error);
    throw error;
  }
};

export const addService = async (touristSpotId, data) => {
  try {
    const response = await axios.post(`${API_URL}/${touristSpotId}/services`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (touristSpotId, serviceId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${touristSpotId}/services/${serviceId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (touristSpotId, serviceId) => {
  try {
    const response = await axios.delete(`${API_URL}/${touristSpotId}/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};
