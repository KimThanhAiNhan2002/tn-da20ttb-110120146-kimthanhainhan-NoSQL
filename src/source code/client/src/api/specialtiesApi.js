import axios from 'axios';

const API_URL = 'http://localhost:5000/api/touristSpots'; // Đảm bảo URL này đúng với URL của server

export const getSpecialties = async (touristSpotId) => {
  try {
    const response = await axios.get(`${API_URL}/${touristSpotId}/specialties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching specialties:', error);
    throw error;
  }
};

export const getAllSpecialties = async () => {
  try {
    const response = await axios.get(`${API_URL}/all/specialties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all specialties:', error);
    throw error;
  }
};

export const getSpecialtyById = async (specialtyId) => {
  try {
    const response = await axios.get(`${API_URL}/specialties/${specialtyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching specialty by id:', error);
    throw error;
  }
};

export const addSpecialty = async (touristSpotId, data) => {
  try {
    const response = await axios.post(`${API_URL}/${touristSpotId}/specialties`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating specialty:', error);
    throw error;
  }
};

export const updateSpecialty = async (touristSpotId, specialtyId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${touristSpotId}/specialties/${specialtyId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating specialty:', error);
    throw error;
  }
};

export const deleteSpecialty = async (touristSpotId, specialtyId) => {
  try {
    const response = await axios.delete(`${API_URL}/${touristSpotId}/specialties/${specialtyId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting specialty:', error);
    throw error;
  }
};
