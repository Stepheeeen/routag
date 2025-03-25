// screens/Onboarding.tsx
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import tw from 'twrnc';
import CustomButton from '~/components/Button';

export default function Onboarding() {
  const handlePress = (button: string) => {
    console.log(`${button} button pressed`);
  };

  const pages = [
    {
      image: require('../../assets/onboarding/image2.png'),
      buttons: [
        { label: 'Login', variant: 'solid' },
        { label: 'Create Account', variant: 'outline' },
      ],
    },
  ];

  return (
<SafeAreaView style={tw`h-[100vh] w-full`}>
      {pages.map((page, index) => (
        <View key={index} style={tw`h-full justify-end pb-10 bg-white`}>
          <Image
            source={page.image}
            style={tw`w-full h-[79%]`}
            resizeMode="cover"
          />

          <View style={tw`px-6 mt-5`}>
            <Text style={tw`text-xl font-bold mb-2 text-center`}>
              Routag your cargo right now!
            </Text>
            <Text style={tw`text-gray-500 text-center mb-6`}>
              Our delivery will ensure your items are delivered right to the door steps
            </Text>

            {page.buttons.map((btn, i) => (
              <CustomButton
                key={i}
                label={btn.label}
                variant={btn.variant as any}
                onPress={() => handlePress(btn.label)}
              />
            ))}
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}