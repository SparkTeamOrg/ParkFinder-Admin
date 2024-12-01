import apiClient from "../axiosConfig";

export const TokenService = {
    refreshToken: async (accessToken: string, refreshToken: string) => {
      try {
        const response = await apiClient.post('/token/refresh', { accessToken, refreshToken });
        return response.data;
      } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
      }
    },

    deleteRefreshToken: async () => {
        try{
            const response = await apiClient.delete('/token/delete');
            return response.data;
        } catch(error){
            throw error;
        }
    }
  };