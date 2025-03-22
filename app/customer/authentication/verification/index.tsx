// screens/VerificationScreen.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import OTPInput from '~/components/OTPInput';
import LayoutPage from '~/layout/PageLayout';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';

export default function VerificationScreen({ navigation }: any) {
    const [code, setCode] = useState(['', '', '', '']);

    return (
        <LayoutPage>
            <View style={tw`p-6`}>
                <Text style={tw`text-xl font-bold mb-2`}>Verification Code</Text>
                <Text style={tw`text-gray-500 mb-5`}>
                    We have sent the code verification to your email <Text style={tw`font-bold`}>example@you.com</Text>
                </Text>

                <View style={tw`w-10/12 mx-auto my-5`}>
                    <OTPInput code={code} setCode={setCode} onComplete={(value) => {
                        console.log("Code entered:", value);
                        // call your verify API here
                    }} />
                </View>

                <Text style={tw`text-center text-gray-500 mb-4`}>02:39</Text>

                <CustomButton label='Submit' onPress={() => router.push("/")} variant='solid' />
                <Text style={tw`text-center`}>
                    Didn’t receive the code? <Text style={tw`text-orange-500 font-semibold`}>Resend</Text>
                </Text>
            </View>
        </LayoutPage>
    );
}
