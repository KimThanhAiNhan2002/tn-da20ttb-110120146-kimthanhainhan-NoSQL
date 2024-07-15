import axios from 'axios';

const API_URL = 'http://localhost:5000/api/touristSpots';

export const getSouvenirs = async (touristSpotId) => {
  try {
    const response = await axios.get(`${API_URL}/${touristSpotId}/souvenirs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching souvenirs:', error);
    throw error;
  }
};

export const getAllSouvenirs = async () => {
  try {
    const response = await axios.get(`${API_URL}/all/souvenirs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all souvenirs:', error);
    throw error;
  }
};

export const getSouvenirById = async (touristSpotId, souvenirId) => {
  try {
    const response = await axios.get(`${API_URL}/${touristSpotId}/souvenirs/${souvenirId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching souvenir by id:', error);
    throw error;
  }
};

export const addSouvenir = async (touristSpotId, data) => {
  try {
    const response = await axios.post(`${API_URL}/${touristSpotId}/souvenirs`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating souvenir:', error);
    throw error;
  }
};

export const updateSouvenir = async (touristSpotId, souvenirId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${touristSpotId}/souvenirs/${souvenirId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating souvenir:', error);
    throw error;
  }
};

export const deleteSouvenir = async (touristSpotId, souvenirId) => {
  try {
    const response = await axios.delete(`${API_URL}/${touristSpotId}/souvenirs/${souvenirId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting souvenir:', error);
    throw error;
  }
};
