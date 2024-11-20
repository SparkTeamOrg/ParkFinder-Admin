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

    deleteRefreshToken: async (userId: Number) => {
        try{
            const response = await apiClient.delete('/token/delete', { params: { userId } });
            return response.data;
        } catch(error){
            throw error;
        }
    }
  };