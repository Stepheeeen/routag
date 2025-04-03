// screens/Onboarding.tsx
import { View, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import tw from 'twrnc';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';

export default function Onboarding() {
  const [step, setStep] = useState(0);

  return (
    <SafeAreaView style={tw`w-full h-full items-center justify-center`}>
      {step === 0 && (
        <View style={tw`relative w-full h-full items-center justify-end`}>
          <Image source={require('assets/svgs/onboardingStep1.png')} alt='image' style={tw`absolute`} />
          <View style={tw`w-full items-center p-4`}>
            <Text style={tw`text-white my-5 text-center font-semibold text-[16px]`}>Your packages delivered by everyday people and trusted businesses — faster, cheaper, and safer.</Text>
            <CustomButton label="Next" onPress={() => setStep(1)} variant='white' />
          </View>
        </View >
      )}

      {step === 1 && (
        <View style={tw`relative w-full h-full items-center justify-end`}>
          <Image source={require('assets/svgs/onboardingStep2.png')} alt='image' style={tw`absolute`} />
          <View style={tw`w-full items-center p-4`}>
            <Text style={tw`text-[#FF6400] my-5 font-semibold text-[16px]`}>At routtag the security of your package is our priority</Text>
            <CustomButton label="Continue" onPress={() => router.push("/authentication/login")} variant='solid' />
          </View>
        </View >
      )}
    </SafeAreaView>
  );
}