import apiClient from "../axiosConfig";

export const ParkingZoneService = {
    getParkingZones: async () => {
        try{
            const response = await apiClient.get('/parking-zone/all');
            return response.data.data
        }
        catch(error){
            console.error('Error getting parkings:', error);
            throw error;
        }
    }
};