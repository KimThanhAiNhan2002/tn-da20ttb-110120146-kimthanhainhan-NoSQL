import axios from 'axios';

const API_URL = 'http://localhost:5000/api/touristSpots'; // Đảm bảo URL này đúng với URL của server

export const getRestaurants = async (touristSpotId) => {
  try {
    const response = await axios.get(`${API_URL}/${touristSpotId}/restaurants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const getAllRestaurants = async () => {
  try {
    const response = await axios.get(`${API_URL}/all/restaurants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all restaurants:', error);
    throw error;
  }
};

export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant by id:', error);
    throw error;
  }
};

export const addRestaurant = async (touristSpotId, data) => {
  try {
    const response = await axios.post(`${API_URL}/${touristSpotId}/restaurants`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};

export const updateRestaurant = async (touristSpotId, restaurantId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${touristSpotId}/restaurants/${restaurantId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

export const deleteRestaurant = async (touristSpotId, restaurantId) => {
  try {
    const response = await axios.delete(`${API_URL}/${touristSpotId}/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};
