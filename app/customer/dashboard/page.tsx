import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons, Feather } from '@expo/vector-icons';
import InputField from '~/components/Input';
import CustomButton from '~/components/Button';
import Dashboard from '~/layout/DashboardLayout';

type FeatureItemProps = {
    title: string;
    icon: keyof typeof Feather.glyphMap;
};

type ActivityItemProps = {
    trackingNumber: string;
    status: string;
    time: string;
};

const DashboardScreen: React.FC = () => {

    return (
        <Dashboard
            headerContent={
                <>
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-white text-lg font-bold`}>ROUTAG</Text>
                        <TouchableOpacity style={tw`relative`}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                            <View style={tw`absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full`} />
                        </TouchableOpacity>
                    </View>
                    {/* Balance Section */}
                    <View style={tw`bg-white p-4 rounded-lg`}>
                        <Text style={tw`text-gray-400`}>My Balance</Text>
                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-[#191D31] text-2xl font-medium`}>₦3,382.00</Text>
                            <View style={tw`flex flex-row items-center gap-2`}>
                                <Text>Top up</Text>
                                <TouchableOpacity style={tw`bg-[#1D272F] p-2 rounded-lg flex`}>
                                    <Feather name="plus" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* Tracking Input */}
                    <InputField icon='search' label='' onChangeText={(text) => console.log(text)} placeholder='Enter track number' value='' />
                </>
            }>
            <View>
                <Text style={tw`text-black text-lg mb-2`}>Features</Text>
                <View style={tw`flex-row justify-between mb-4 w-full`}>
                    <FeatureItem title="Help Center" icon="message-square" />
                    <FeatureItem title="Wallet" icon="credit-card" />
                    <FeatureItem title="Order" icon="package" />
                </View>

                <View>
                    <Text style={tw`text-black text-lg mb-2`}>Recent Activity</Text>
                    <ScrollView style={tw`mb-4`}>
                        {["MM09132005", "MA84561259", "FU84593276"].map((item, index) => (
                            <ActivityItem key={index} trackingNumber={item} status="Processed at sort facility" time="2 Hrs" />
                        ))}
                    </ScrollView>

                    {/* Request Carrier Button */}
                    <CustomButton label='Request Carrier' onPress={() => { }} variant='solid' />
                </View>
            </View>

        </Dashboard >
    )
};

const FeatureItem: React.FC<FeatureItemProps> = ({ title, icon }) => (
    <TouchableOpacity style={tw`border border-[#F3F3F3] p-2 py-4 rounded-lg items-center w-28`}>
        <Feather name={icon} size={24} color="#1D272F" style={tw`mb-2`} />
        <Text style={tw`text-#1D272F text-sm`}>{title}</Text>
    </TouchableOpacity>
);

const ActivityItem: React.FC<ActivityItemProps> = ({ trackingNumber, status, time }) => (
    <View style={tw`border border-[#F3F3F3] p-3 w-full rounded-lg mb-2 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center gap-3`}>
            <View style={tw`bg-[#F2F4F9] p-2 rounded`}>
                <Feather name="package" size={32} color="#1D272F" />
            </View>
            <View>
                <Text style={tw`text-black font-medium`}>{trackingNumber}</Text>
                <Text style={tw`text-gray-400`}>{status}</Text>
            </View>
        </View>
        <Text style={tw`text-gray-400`}>{time}</Text>
    </View>
);

export default DashboardScreen;