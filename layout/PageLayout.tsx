import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';

interface LayoutPageProps {
    pageLabel?: string;
    children: ReactNode;
}

const LayoutPage: React.FC<LayoutPageProps> = ({ pageLabel, children }) => {

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Header with Back Button */}
            <View style={tw`flex-row items-center justify-between px-4 pt-4`}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={tw`w-10 h-10 rounded-full border border-gray-300 items-center justify-center`}
                >
                    <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>

                {pageLabel && (
                    <View style={tw`absolute left-0 right-0 items-center`}>
                        <Text style={tw`text-xl pt-4 font-semibold text-black`}>
                            {pageLabel}
                        </Text>
                    </View>
                )}
            </View>

            {/* Body */}
            <View style={tw`flex-1`}>
                {children}
            </View>
        </View>
    );
};

export default LayoutPage;