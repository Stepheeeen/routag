// screens/Onboarding.tsx
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import tw from 'twrnc';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';

export default function Onboarding() {
  const handlePress = (page: any) => {
    router.push(page)
  };

  const pages = [
    {
      image: require('../assets/onboarding/image1.png'),
      buttons: [
        { label: 'Carrier', variant: 'black', path: "/carrier" },
        { label: 'Customer', variant: 'outline', path: "/customer" },
      ],
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 w-full`}>
      {pages.map((page, index) => (
        <View key={index} style={tw`h-full justify-end pb-10 bg-white`}>
          <Image
            source={page.image}
            style={tw`w-full h-[75%]`}
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
                onPress={() => handlePress(btn.path)}
              />
            ))}
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}