// screens/SignUpScreen.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import InputField from '~/components/Input';
import { Link, router } from 'expo-router';
import CustomButton from '~/components/Button';
import LayoutPage from '~/layout/PageLayout';

export default function SignInScreen() {
  const [email, setEmail] = useState('');

  return (
    <LayoutPage pageLabel=''>
      <View style={tw`p-4`}>
        <Text style={tw`text-[#100F0D] text-[20px] font-semibold my-5`}>Forgot Password</Text>
        <Text style={tw`text-gray-500 mb-5`}>Enter the email attached to your Route Tag account </Text>

        <View style={tw`my-4`}>
          <InputField label="Email Address" placeholder="example@you.com" value={email} onChangeText={setEmail} />
        </View>

          <CustomButton label='Send OTP' onPress={() => router.push("/authentication/verification")} variant='solid' />
      </View>
    </LayoutPage>
  );
}