// screens/SignUpScreen.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import InputField from '~/components/Input';
import { Link, router } from 'expo-router';
import CustomButton from '~/components/Button';
import LayoutPage from '~/layout/PageLayout';
import { postRequest } from '~/api/requests/postRequest';
import { passRoute, UserAuthentication } from '~/utils/authentication.flow';
import Toast from '~/components/Toast';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      setToastType('error');
      setToastMessage("Please fill all required fields");
      setShowToast(true);

      // Reset toast state after a delay
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setLoading(true);
      try {
        const response = await postRequest.forgotPassword(email);
        console.log(response.data);

        setToastType('success');
        setToastMessage(response.data.message);
        setShowToast(true);

        // Reset toast state after a delay
        setTimeout(() => setShowToast(false), 3000);
        UserAuthentication.email = email;
        UserAuthentication.code = response.data.otp;
        passRoute.url = '/sender/tabs/Home'
        router.push('/authentication/verification')

      } catch (error: any) {
        setToastType('error');
        setToastMessage(error.response?.data?.message || "An error occurred");
        setShowToast(true);

        // Reset toast state after a delay
        setTimeout(() => setShowToast(false), 3000);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <LayoutPage pageLabel=''>
      <View style={tw`p-4`}>
        <Text style={tw`text-[#100F0D] text-[20px] font-semibold my-5`}>Forgot Password</Text>
        <Text style={tw`text-gray-500 mb-5`}>Enter the email attached to your Route Tag account </Text>

        <View style={tw`my-4`}>
          <InputField label="Email Address" placeholder="example@you.com" value={email} onChangeText={setEmail} />
        </View>

        <CustomButton label='Send OTP' onPress={() => handleForgotPassword()} variant='solid' loading={loading} />
      </View>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
        />
      )}
    </LayoutPage>
  );
}
