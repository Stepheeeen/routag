// screens/Onboarding.tsx
import { View, Text, Image, } from 'react-native';
import "./global.css"
import CustomButton from 'components/reusable/button';
import { SafeAreaView } from 'react-native-safe-area-context';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledImage = styled(Image);

export default function Onboarding() {
  const handlePress = (button: string) => {
    console.log(`${button} button pressed`);
  };

  const pages = [
    {
      image: require('./assets/onboarding/image1.png'),
      buttons: [
        { label: 'Carrier', variant: 'solid' },
        { label: 'Customer', variant: 'outline' },
      ],
    },
    // {
    //   image: require('./assets/onboarding/image2.png'),
    //   buttons: [
    //     { label: 'Login', variant: 'solid' },
    //     { label: 'Create Account', variant: 'outline' },
    //   ],
    // },
    // {
    //   image: require('./assets/onboarding/image3.png'),
    //   buttons: [
    //     { label: 'Login', variant: 'solid' },
    //     { label: 'Create Account', variant: 'outline' },
    //   ],
    // },
  ];

  return (
    <SafeAreaView className='flex-1 w-full p-0'>
      {pages.map((page, index) => (
        <View key={index} className=" h-full justify-end pb-10 px-6 bg-white">
          <Image
            source={page.image}
            className="absolute top-0 left-0 w-full h-[70%]"
            resizeMode="cover"
          />

          <Text className="text-xl font-bold mb-2 text-center">
            Routag your cargo right now!
          </Text>
          <Text className="text-gray-500 text-center mb-6">
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
      ))}
    </SafeAreaView>
  );
}