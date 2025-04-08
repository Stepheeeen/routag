import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';
import { deliveriesData } from '~/db/deliveries';

const DeliveryItem: React.FC<{ item: any; onPress: () => void }> = ({ item, onPress }) => {
    // Function to determine the style for the status badge
    const getStatusStyle = (status: any) => {
        switch (status) {
            case 'In progress':
                return {
                    container: tw`bg-[#FFD1C6]`,
                    text: tw`text-[#FF6400]`,
                };
            case 'Delivered':
                return {
                    container: tw`bg-[#FF6400]`,
                    text: tw`text-white`,
                };
            case 'You Cancelled':
            case 'Courier Cancelled':
                return {
                    container: tw`bg-gray-400`,
                    text: tw`text-white`,
                };
            default:
                return {
                    container: tw`bg-gray-200`,
                    text: tw`text-gray-800`,
                };
        }
    };

    return (
        <TouchableOpacity
            style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}
            onPress={onPress}
        >
            <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-base font-medium`}>{item.date}</Text>
                <Text style={tw`text-base font-medium`}>{item.amount}</Text>
            </View>

            <View style={tw`flex-row`}>
                {/* Route indicators */}
                <View style={tw`mr-3`}>
                    <View style={tw`items-center`}>
                        <View style={tw`w-4 h-4 rounded-full border-2 border-[#FF6400]`} />
                        <View style={tw`h-12 w-0.5 bg-[#FF6400] my-1`} />
                        <View style={tw`w-4 h-4 rounded-full bg-[#FF6400]`} />
                    </View>
                </View>

                {/* Locations */}
                <View style={tw`flex-1 justify-between`}>
                    <Text style={tw`text-base -mt-1`}>{item.pickupLocation}</Text>
                    <Text style={tw`text-base -mb-1`}>{item.dropoffLocation}</Text>
                </View>

                {/* Arrow */}
                <View style={tw`justify-center`}>
                    <Feather name="chevron-right" size={24} color="#FF6400" />
                </View>
            </View>

            {/* Status badge */}
            <View style={tw`mt-4`}>
                <View style={[tw`self-start rounded-full px-4 py-1`, getStatusStyle(item.status).container]}>
                    <Text style={[tw`font-medium`, getStatusStyle(item.status).text]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const MyDeliveriesScreen: React.FC = () => {
    const handleDeliveryPress = (delivery: any) => {
        // Navigate to delivery details screen
        console.log('Delivery pressed:', delivery);
        // navigation.navigate('DeliveryDetails', { delivery });
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-100`}>
            <View style={tw`px-4 pt-8 pb-4`}>
                <Text style={tw`text-2xl font-bold`}>My Deliveries</Text>
            </View>

            <FlatList
                data={deliveriesData}
                renderItem={({ item }) => (
                    <DeliveryItem
                        item={item}
                        onPress={() => handleDeliveryPress(item)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={tw`px-4 pt-2 pb-8`}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default MyDeliveriesScreen;