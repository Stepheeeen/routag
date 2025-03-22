// screens/SignUpScreen.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import InputField from '~/components/Input';
import { router } from 'expo-router';
import CustomButton from '~/components/Button';
import LayoutPage from '~/layout/PageLayout';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LayoutPage pageLabel='Login'>
      <View style={tw`p-4`}>
        {/* <Text style={tw`text-xl font-bold mb-2`}>Personal Information</Text> */}
        <Text style={tw`text-gray-500 mb-5`}>Please provide your login details fo easy and quick access to the app</Text>

        <View style={tw`my-4`}>
          <InputField label="Email" placeholder="example@you.com" icon="mail" value={email} onChangeText={setEmail} />
          <InputField label="Password" placeholder="******" icon="lock" value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <CustomButton label='Login' onPress={() => router.push("/")} variant='solid' />
      </View>
    </LayoutPage>
  );
}