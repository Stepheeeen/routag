import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import OTPInput from '~/components/OTPInput';
import LayoutPage from '~/layout/PageLayout';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';

export default function VerificationScreen() {
    const [code, setCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(120); // 2 minutes

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResend = () => {
        if (timer === 0) {
            // trigger resend API here
            console.log("Resend code");
            setTimer(120); // reset timer
        }
    };

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

                <CustomButton label='Submit' onPress={() => router.push("/")} variant='solid' />

                <Text style={tw`text-center mt-4`}>
                    Didn’t receive the code?{" "}
                    {timer > 0 ? (
                        <Text style={tw`text-gray-500`}>{formatTime(timer)}</Text>
                    ) : (
                        <TouchableOpacity onPress={handleResend}>
                            <Text style={tw`text-orange-500 font-semibold`}>Resend</Text>
                        </TouchableOpacity>
                    )}
                </Text>
            </View>
        </LayoutPage>
    );
}
