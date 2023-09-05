import axios from "axios"
import { apiUrl, path, apiLogin, apiUpload } from "./constants"
import jwt_decode from "jwt-decode";

const AccessToken = localStorage.getItem('token');
///////////

// const Config = {
//     'Content-Type': 'application/json',
//     'Authorization': apiKeyAuth,
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': '*'
// }

const authApi = axios.create({ baseURL: apiUrl })
const authUpload = axios.create({ baseURL: apiUpload})
const authLogin = axios.create({ baseURL: apiLogin })


// const authApi = axios.create({ baseURL: apiUrl, headers: {'Authorization': `Bearer ${AccessToken}`}})

// Function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token) {
      return true; // Token doesn't exist or is empty, consider it expired
    }
  
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
  
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If there's an error in decoding the token, consider it expired
    }
};

// Function to clear local storage and log out the user
const clearLocalStorageAndLogout = () => {
    localStorage.clear();
    location.href = "/login"
    return { status: true, message: "ออกจากระบบ" }
};

// Check token expiration and clear local storage if expired 
export const checkTokenExpiration = () => {
    if (isTokenExpired(AccessToken)) {
      clearLocalStorageAndLogout();
    }
};

// Run the token expiration check every 3 minutes (180,000 milliseconds)
setInterval(checkTokenExpiration, 180000);

// Response Interceptor
authLogin.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            try {
                const  newAccessToken = await refreshToken();
                authLogin.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers(originalRequest)
                return authLogin(originalRequest)
            } catch (refreshError) {
                throw refreshError;
            }
        }
        return Promise.reject(error)
    }
)

///////////

// apiLogin
export const loginApi = async ( JsonData ) => {
    try {
        const response = await authLogin.post (apiLogin + path.LOGIN_URL, JsonData)
            if (response.status === 200){
                // console.log(response.data)
                localStorage.setItem( "token", response.data.token );
                if (response.data.token){
                    const decodedToken = jwt_decode(response.data.token)
                    localStorage.setItem( "userData", JSON.stringify(decodedToken))
                }
            }
        return response
    } catch (error) {
        throw error
    }
}

// GetSerial_No
export const getProduct = async ( jsonSerial ) => {
    try {
        const response = await authApi.post (apiUrl + path.GET_PRODUCT_SERIAL, jsonSerial)
        return response
    } catch (error) {
        throw error
    }
}

// Getlist_Problem
export const getListProblem = async () => {
    try {
        const response = await authApi.get (apiUrl + path.GET_LIST_PROBLEM)
        return response
    } catch (error) {
        throw error
    }
}

export const UpdateSerialPost = async ( JsonData ) => {
    try {
        const response = await axios.post (apiUrl + path.UPDATE_SERIAL, JsonData)
        return response
    } catch (error) {
        throw error
    }
}

export const UploadImage = async ( file, serial, branch ) => {
    try {
        let formData = new FormData(); 
        for (let i = 0; i < file.length; i++) {
            formData.append('files', file[i]);
        }

        const response = await authUpload.post(apiUpload + path.UPLOAD_IMG + '?serial=' + serial + '&branch=' + branch, formData)
        return response
    } catch (error) {
        throw error
    }
}