// Admin API Service
import { apiPost, apiGet, apiPut, apiDelete, replacePathParams } from './apiHelper';
import { API_ENDPOINTS } from './apiConfig';

// Register Admin
export const registerAdmin = async (adminData) => {
  return apiPost(API_ENDPOINTS.ADMIN_REGISTER, adminData);
};

// Login Admin
export const loginAdmin = async (email, password) => {
  return apiPost(API_ENDPOINTS.ADMIN_LOGIN, null, { email, password });
};

// Get Admin by ID
export const getAdminById = async (id) => {
  const endpoint = replacePathParams(API_ENDPOINTS.ADMIN_GET, { id });
  return apiGet(endpoint);
};

// Update Admin
export const updateAdmin = async (id, adminData) => {
  const endpoint = replacePathParams(API_ENDPOINTS.ADMIN_UPDATE, { id });
  return apiPut(endpoint, adminData);
};

// Delete Admin
export const deleteAdmin = async (id) => {
  const endpoint = replacePathParams(API_ENDPOINTS.ADMIN_DELETE, { id });
  return apiDelete(endpoint);
};

// Get Admin Profile
export const getAdminProfile = async () => {
  return apiGet(API_ENDPOINTS.ADMIN_PROFILE);
};

// Update Admin Profile
export const updateAdminProfile = async (profileData) => {
  return apiPut(API_ENDPOINTS.ADMIN_PROFILE_UPDATE, profileData);
};

// Upload Admin Photo
export const uploadAdminPhoto = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  // Get JWT token from localStorage
  const token = localStorage.getItem('token');

  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}${API_ENDPOINTS.ADMIN_PHOTO_UPLOAD}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to upload photo');
  }

  return response.json();
};

// Delete Admin Photo
export const deleteAdminPhoto = async () => {
  return apiDelete(API_ENDPOINTS.ADMIN_PHOTO_DELETE);
};

// OTP-based Password Reset
export const sendOtp = async (email) => {
  return apiPost(API_ENDPOINTS.ADMIN_SEND_OTP, null, { email });
};

export const verifyOtp = async (email, otp) => {
  return apiPost(API_ENDPOINTS.ADMIN_VERIFY_OTP, null, { email, otp });
};

export const resetPassword = async (email, newPassword, otp) => {
  return apiPost(API_ENDPOINTS.ADMIN_RESET_PASSWORD, null, { email, newPassword, otp });
};
