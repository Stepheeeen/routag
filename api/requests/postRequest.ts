import axiosInstance from '../axiosInstance';

// All your requests in one file
export const postRequest = {
  login: (email: string, password: string) =>
    axiosInstance.post('/auth/signin', { email, password }),

  registerCustomer: (fullname: string, email: string, password: string, phone: string) =>
    axiosInstance.post('/auth/register/customer', { fullname, email, password, phone }),

  verifyEmail: (email: string, code: any) =>
    axiosInstance.post('/auth/verify_email', { email, otp:code }),

  resendCode: (email: string) =>
    axiosInstance.post('/auth/resend_verification_mail', { email }),
  forgotPassword: (email: string) =>
    axiosInstance.post('/auth/forgot_password', { email }),
};
