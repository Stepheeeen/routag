// screens/SignUpScreen.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import InputField from '~/components/Input';
import { router } from 'expo-router';
import CustomButton from '~/components/Button';
import LayoutPage from '~/layout/PageLayout';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  return (
    <LayoutPage>
      <View style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>Personal Information</Text>
        <Text style={tw`text-gray-500 mb-5`}>Please provide us with your personal details to know you better</Text>

        <View style={tw`my-4`}>
          <InputField label="Full Name" placeholder="John Doe" icon="user" value={name} onChangeText={setName} />
          <InputField label="Email" placeholder="example@you.com" icon="mail" value={email} onChangeText={setEmail} />
          <InputField label="Password" placeholder="******" icon="lock" value={password} onChangeText={setPassword} secureTextEntry />
          <InputField label="Confirm Password" placeholder="******" icon="lock" value={ConfirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        </View>

        <CustomButton label='Create Account' onPress={() => router.push("/customer/authentication/verification")} variant='solid' />
      </View>
    </LayoutPage>
  );
}