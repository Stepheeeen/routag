import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';

interface LayoutPageProps {
    pageLabel?: string;
    children: ReactNode;
    classname?: any
}

const LayoutPage: React.FC<LayoutPageProps> = ({ pageLabel, children, classname }) => {

    return (
        <View style={tw`flex-1 bg-[#F3F3F4]`}>
            {/* Header with Back Button */}
            <View style={tw`flex-row items-center justify-between px-4 pt-4`}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={tw`w-10 h-10 rounded-full border border-gray-300 bg-white items-center justify-center`}
                >
                    <Ionicons name="chevron-back" size={20} color="#FF6400" />
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
            <ScrollView style={tw`flex-1 ${classname}`} overScrollMode='never'>
                {children}
            </ScrollView>
        </View>
    );
};

export default LayoutPage;