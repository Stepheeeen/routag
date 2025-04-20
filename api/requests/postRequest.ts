import axiosInstance from '../axiosInstance';

// All your requests in one file
export const postRequest = {
  login: (email: string, password: string) =>
    axiosInstance.post('/auth/login', { email, password }),

  registerCustomer: (fullname: string, email: string, password: string, phone: string) =>
    axiosInstance.post('/auth/register/customer', { fullname, email, password, phone }),
};
