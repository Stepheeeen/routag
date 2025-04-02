import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import OTPInput from '~/components/OTPInput';
import LayoutPage from '~/layout/PageLayout';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';

export default function VerificationScreen() {
    const [code, setCode] = useState(['', '', '', '', '']);
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
                <Text style={tw`text-xl font-bold mb-2`}>OTP Verification</Text>
                <Text style={tw`text-gray-500 mb-5`}>
                    OTP as been sent to <Text style={tw`font-bold`}>Damilare@gmail.com</Text>
                </Text>

                <View style={tw`w-11/12 mx-auto my-5`}>
                <Text style={tw`mb-4 text-[#100F0D]`}>Enter Code</Text>
                    <OTPInput code={code} setCode={setCode} onComplete={(value) => {
                        console.log("Code entered:", value);
                        // call your verify API here
                    }} />
                    <Text style={tw`mb-4`}>
                        Didn’t receive the code?{" "}
                        {timer > 0 ? (
                            <Text style={tw`text-gray-500`}>{formatTime(timer)}</Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={tw`text-orange-500`}>Resend</Text>
                            </TouchableOpacity>
                        )}
                    </Text>
                </View>


                <CustomButton label='Verify' onPress={() => router.push("/")} variant='solid' />

            </View>
        </LayoutPage>
    );
}
