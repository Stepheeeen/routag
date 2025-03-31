import { Feather, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import tw from 'twrnc'
import LayoutPage from '~/layout/PageLayout'

const NotificationList: React.FC<{ icon: React.ReactNode; notification: string; description: string; time: string }> = ({ icon, notification, description, time }) => {
    return (
        <View style={tw`border-b border-[#F3F3F3] p-3 w-full rounded-lg mb-2 flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`bg-[#1D272F] p-3 rounded-full`}>
                    {icon}
                </View>
                <View>
                    <Text style={tw`text-black font-medium text-wrap`}>{notification}</Text>
                    <Text style={tw`text-gray-400`}>{description}</Text>
                </View>
            </View>
            <Text style={tw`text-gray-400`}>{time}</Text>
        </View>
    )
}

const index = () => {
    const notificationData = [
        { icon: <Feather name='bell' size={20} color={"white"} />, notification: "Carrier has arrived", description: "Your carrier is waiting", time: "2min ago" },
        { icon: <Feather name='package' size={20} color={"white"} />, notification: "Your Shipping Already Delivered", description: "Tap to  see the detail shipping", time: "2min ago" },
        { icon: <MaterialIcons name="discount" size={24} color="white" />, notification: "Get just earned on refferal", description: "Check your referral list", time: "10min ago" },
    ]
    return (
        <LayoutPage pageLabel='Notification' classname={"p-4"}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
                <View style={tw`flex-row justify-between items-center gap-x-2`}>
                    <Text style={tw`text-black text-lg font-bold flex items-center`}>Recent</Text>
                    <Text style={tw`bg-[#FD683D] px-2 py-1 rounded-full text-white`}>4</Text>
                </View>
                <TouchableOpacity style={tw``} onPress={() => router.push("/customer/notification")}>
                    <Text style={tw`text-[#FD683D]`}>Clear All</Text>
                </TouchableOpacity>
            </View>
            <View>
                {notificationData.map((index, i) => (
                    <NotificationList
                        description={index.description}
                        icon={index.icon}
                        notification={index.notification}
                        time={index.time}
                        key={i}
                    />
                ))}
            </View>
        </LayoutPage>
    )
}

export default index