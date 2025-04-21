import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import OTPInput from '~/components/OTPInput';
import LayoutPage from '~/layout/PageLayout';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';
import { passRoute, UserAuthentication } from '~/utils/authentication.flow';
import { postRequest } from '~/api/requests/postRequest';
import Toast from '~/components/Toast';

export default function VerificationScreen() {
    const [email, setEmail] = useState(UserAuthentication.email)
    const [code, setCode] = useState(['', '', '', '', '']);
    const [timer, setTimer] = useState(120); // 2 minutes


    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error'>('success')
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false)

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

    const handleVerifyOTP = async () => {
        try {
            const response = await postRequest.verifyEmail(email, code)
            setToastType('success');
            setToastMessage(response.data.message);
            setShowToast(true);

            // Reset toast state after a delay
            setTimeout(() => setShowToast(false), 3000);

            router.push(passRoute.url as any)
        } catch (error: any) {
            setToastType('error');
            setToastMessage(error.response?.data?.message || 'An error occurred');
            setShowToast(true);

            // Reset toast state after a delay
            setTimeout(() => setShowToast(false), 3000);
        } finally {
            setCode(['', '', '', '', '']);
            setLoading(false);
        }
    }

    const handleResend = async () => {
        if (timer === 0) {
            // trigger resend API
            try {
                const response = await postRequest.resendCode(email)
                setToastType('success');
                setToastMessage(response.data.message);
                setShowToast(true);

                // Reset toast state after a delay
                setTimeout(() => setShowToast(false), 3000);
            } catch (error: any) {
                setToastType('error');
                setToastMessage(error.response?.data?.message || "An error occurred");
                setShowToast(true);

                // Reset toast state after a delay
                setTimeout(() => setShowToast(false), 3000);
            }

            setTimer(120); // reset timer
        }
    };

    return (
        <LayoutPage>
            <View style={tw`p-6`}>
                <Text style={tw`text-xl font-bold mb-2`}>OTP Verification</Text>
                <Text style={tw`text-gray-500 mb-5`}>
                    OTP as been sent to <Text style={tw`font-bold`}>{email}</Text>
                </Text>

                <View style={tw`w-11/12 mx-auto my-5`}>
                    <Text style={tw`mb-4 text-[#100F0D]`}>Enter Code</Text>
                    <OTPInput code={code} setCode={setCode} />
                    <Text style={tw`mb-4`}>
                        Didn’t receive the code?{" "}
                        {timer > 0 ? (
                            <Text style={tw`text-gray-500`}>{formatTime(timer)}</Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={tw`text-orange-500 -mb-1`}>Resend</Text>
                            </TouchableOpacity>
                        )}
                    </Text>
                </View>


                <CustomButton label='Verify' onPress={() => handleVerifyOTP()} variant='solid' loading={loading} />

            </View>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    duration={3000}
                />
            )}
        </LayoutPage>
    );
}
