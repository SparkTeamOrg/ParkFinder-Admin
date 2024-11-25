import apiClient from "../axiosConfig";
import { CreateParkingLotDto } from "../dto/CreatParkingLotDto";

export const ParkingService = {
    getParkingLots: async () => {
        try{
            const response = await apiClient.get('/parking/all');
            return response.data
        }
        catch(error){
            console.error('Error getting parkings:', error);
            throw error;
        }
    },

    addParking: async (polygon: CreateParkingLotDto) => {
      try {
        const response = await apiClient.post('/parking/new', polygon);
        return response.data;
      } catch (error) {
        console.error('Error adding parking:', error);
        throw error;
      }
    },

    deleteParkingLot: async (id: Number) => {
        try{
            const response = await apiClient.delete('/parking', { params: { id } });
            return response.data;
        } catch(error){
            throw error;
        }
    }
  };