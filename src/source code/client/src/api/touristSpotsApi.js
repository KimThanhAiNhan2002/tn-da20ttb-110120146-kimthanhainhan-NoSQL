// touristSpotsApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/touristSpots/tourist-spots'; // Đảm bảo URL này đúng với URL của server

export const getTouristSpots = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist spots:', error);
    throw error;
  }
};

export const getTouristSpotById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist spot by id:', error);
    throw error;
  }
};

export const createTouristSpot = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating tourist spot:', error);
    throw error;
  }
};

export const updateTouristSpot = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating tourist spot:', error);
    throw error;
  }
};

export const deleteTouristSpot = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tourist spot:', error);
    throw error;
  }
};
