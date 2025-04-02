// screens/SignUpScreen.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import InputField from '~/components/Input';
import { Link, router } from 'expo-router';
import CustomButton from '~/components/Button';
import LayoutPage from '~/layout/PageLayout';
import { AppleLogo, Facebook, FaceIDIcon, GoogleLogo, RouttagLogo } from '~/assets/svgs';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LayoutPage pageLabel=''>
      <View style={tw`p-4`}>
        <RouttagLogo />
        <Text style={tw`text-[#100F0D] text-[20px] font-semibold my-5`}>Welcome Back!</Text>
        <Text style={tw`text-gray-500 mb-5`}>Log in to continue.</Text>

        <View style={tw`my-4`}>
          <InputField label="Email" placeholder="example@you.com" value={email} onChangeText={setEmail} />
          <InputField label="Password" placeholder="******" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity>
            <Link href={"/authentication/forgot-password"} style={tw`text-[#FF6400]`}>
              Forgot Password
            </Link>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row w-full justify-evenly`}>
          <CustomButton label='Face ID' onPress={() => {}} variant='black' icon={<FaceIDIcon />} width='w-[45%]' />
          <CustomButton label='Login' onPress={() => router.push("/")} variant='solid' width='w-[45%]' />
        </View>

        <View style={tw`flex-row justify-center my-5`}>
          <Text style={tw`text-[#100F0D]`}>New to Route Tag?</Text>
          <Link href="/authentication/create-account" style={tw`text-[#FF6400] ml-1`}>
            Sign Up
          </Link>
        </View>

        <CustomButton label='Continue with Apple' onPress={() => {}} variant='outline' icon={<AppleLogo />} />
        <CustomButton label='Continue with Google' onPress={() => {}} variant='outline' icon={<GoogleLogo />} />
        <CustomButton label='Continue with Facebook' onPress={() => {}} variant='outline' icon={<Facebook />} />
      </View>
    </LayoutPage>
  );
}