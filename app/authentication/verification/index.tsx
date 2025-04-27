import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
// Removed unused OTPInput import
import LayoutPage from '~/layout/PageLayout';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';
import { passRoute, UserAuthentication } from '~/utils/authentication.flow';
import { postRequest } from '~/api/requests/postRequest';
import Toast from '~/components/Toast';

export default function VerificationScreen() {
    const [email] = useState(UserAuthentication.email);
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(120); // 2 minutes


    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error'>('success')
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const inputRefs = React.useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        Alert.alert("OTP", `Your Verification Code is ${UserAuthentication.code}. please copy your OTP`)
    }, [UserAuthentication.code])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleChange = (text: string, idx: number) => {
        if (text.length > 1) {
            // User pasted the whole code
            const textArray = text.split('').slice(0, 6);
            setCode(textArray);
            inputRefs.current[5]?.focus(); // Focus last input
            return;
        }

        const newCode = [...code];
        newCode[idx] = text;
        setCode(newCode);

        if (text && idx < code.length - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, idx: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (!code[idx] && idx > 0) {
                inputRefs.current[idx - 1]?.focus();
            }
        }
    };

    const handleVerifyOTP = async () => {
        setLoading(true); // <== set loading to true immediately

        try {
            const response = await postRequest.verifyEmail(email, code.join('')); // <== join array into string
            setToastType('success');
            setToastMessage(response.data.message);
            setShowToast(true);

            setTimeout(() => setShowToast(false), 3000);

            setTimeout(() => router.push(passRoute.url as any), 2500)

        } catch (error: any) {
            setToastType('error');
            setToastMessage(error.response?.data?.message || 'An error occurred');
            setShowToast(true);

            setTimeout(() => setShowToast(false), 3000);
        } finally {
            setCode(['', '', '', '', '', '']);
            setLoading(false);
            passRoute.url = '';
            UserAuthentication.email = '';
        }
    };

    const handleResend = async () => {
        if (timer === 0) {
            // trigger resend API
            try {
                const response = await postRequest.resendCode(email)
                UserAuthentication.code = response.data.otp
                setToastType('success');
                setToastMessage(response.data.message);
                setShowToast(true);

                // Reset toast state after a delay
                setTimeout(() => setShowToast(false), 3000);

                Alert.alert("OTP", `Your Verification Code is ${UserAuthentication.code}. please copy your OTP`)
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
            <View style={tw`p-3`}>
                <Text style={tw`text-xl font-bold mb-2`}>OTP Verification</Text>
                <Text style={tw`text-gray-500 mb-5`}>
                    OTP as been sent to <Text style={tw`font-bold`}>{email}</Text>
                </Text>

                <View style={tw`w-11/12 mx-auto my-5`}>
                    <Text style={tw`mb-4 text-[#100F0D]`}>Enter Code</Text>
                    <View style={tw`flex-row justify-between items-center w-full mb-4`}>
                        {code.map((digit, idx) => (
                            <TextInput
                                key={idx}
                                ref={(ref) => (inputRefs.current[idx] = ref)}
                                value={digit}
                                onChangeText={(text) => handleChange(text, idx)}
                                onKeyPress={(e: any) => handleKeyPress(e, idx)}
                                maxLength={1}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                editable={!loading}
                                style={tw`w-12 h-13 bg-[#FFDCD7] rounded-xl text-xl text-center`}
                            />
                        ))}
                    </View>
                    <Text style={tw`mb-4`}>
                        Didn’t receive the code?{" "}
                        {timer > 0 ? (
                            <Text style={tw`text-gray-500`}>{formatTime(timer)}</Text>
                        ) : loading ? (
                            <ActivityIndicator />
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
