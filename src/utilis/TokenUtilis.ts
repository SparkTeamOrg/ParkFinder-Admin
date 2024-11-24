import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    UserId: string;
    IsAdmin: string;
}

export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const clearTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      return decodedToken.exp < currentTime;
    } catch (error) {
      return false;
    }
};

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if(token){
      const decodedToken: JwtPayload = jwtDecode(token)
      return parseInt(decodedToken.UserId)
    }
};

export const isUserAdmin = (token: string | null) => {
  if(token){
    const decodedToken: JwtPayload = jwtDecode(token)
    return decodedToken.IsAdmin === "True"
  }
  return false
};