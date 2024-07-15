//accommodationsApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/touristSpots'; // Đảm bảo URL này đúng với URL của server

export const getAccommodations = async (touristSpotId) => {
  try {
    const response = await axios.get(`${API_URL}/${touristSpotId}/accommodations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    throw error;
  }
};

export const getAllAccommodations = async () => {
  try {
    const response = await axios.get(`${API_URL}/all/accommodations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all accommodations:', error);
    throw error;
  }
};


export const getAccommodationById = async (accommodationId) => {
  try {
    const response = await axios.get(`${API_URL}/accommodations/${accommodationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accommodation by id:', error);
    throw error;
  }
};

export const addAccommodation = async (touristSpotId, data) => {
  try {
    const response = await axios.post(`${API_URL}/${touristSpotId}/accommodations`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating accommodation:', error);
    throw error;
  }
};

export const updateAccommodation = async (touristSpotId, accommodationId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${touristSpotId}/accommodations/${accommodationId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating accommodation:', error);
    throw error;
  }
};

export const deleteAccommodation = async (touristSpotId, accommodationId) => {
  try {
    const response = await axios.delete(`${API_URL}/${touristSpotId}/accommodations/${accommodationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting accommodation:', error);
    throw error;
  }
};
