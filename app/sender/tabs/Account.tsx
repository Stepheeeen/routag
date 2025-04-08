import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import LayoutPage from '~/layout/PageLayout';
import CustomButton from '~/components/Button';
import { router } from 'expo-router';
import FullPageModalLayout from '~/layout/FullPageModalLayout';
import { BuildingImg, PackageImg, VehicleImg } from '~/assets/svgs/image';
import { SelectionCard } from '~/app/authentication/create-account';
const Account = () => {
    const [personalInfo, setPersonalInfo] = useState(false);
    const [switchRole, setSwitchRole] = useState(false);
    // You would typically get this data from your state or context
    const userData = {
        name: 'Amaka Rayan',
        phone: '+2358108368421',
        email: 'Amakarayan@gmail.com',
        // Profile image would come from your assets or a URL
    };
    return (
        <LayoutPage noscroll={true} classname={'p-4 pt-[13%]'}>
            <View style={tw`items-center mt-8 mb-6`}>
                <Image
                    source={require('../../../assets/profile-image.png')} // Update this path to your image
                    // For testing, you could use: source={{ uri: 'https://via.placeholder.com/120' }}
                    style={tw`w-28 h-28 rounded-full`}
                />
                <Text style={tw`text-2xl font-bold mt-4`}>Amaka Rayan</Text>

                {/* Rating */}
                <View style={tw`flex-row items-center mt-1`}>
                    <FontAwesome name="star" size={21} color="#FFC107" style={tw`mr-2`} />
                    <Text style={tw`text-lg font-bold`}>4.8</Text>
                    <Text style={tw`text-lg text-gray-600 ml-2`}>Rating</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View style={tw`mt-5`}>
                {/* Personal Info */}
                <TouchableOpacity
                    style={tw`flex-row items-center justify-between py-4`}
                    onPress={() => setPersonalInfo(true)}
                >
                    <View style={tw`flex-row items-center`}>
                        <Feather name="user" size={24} color="black" style={tw`mr-4`} />
                        <Text style={tw`text-lg`}>Personal Info</Text>
                    </View>
                    <Feather name="chevron-right" size={24} color="black" />
                </TouchableOpacity>

                {/* Divider */}
                <View style={tw`h-px bg-gray-200 my-2`}></View>

                {/* Logout */}
                <TouchableOpacity
                    style={tw`flex-row items-center justify-between py-4`}
                    onPress={() => router.push('/authentication/login')}
                >
                    <View style={tw`flex-row items-center`}>
                        <Feather name="log-out" size={24} color="black" style={tw`mr-4`} />
                        <Text style={tw`text-lg`}>Log out</Text>
                    </View>
                </TouchableOpacity>

                {/* Divider */}
                <View style={tw`h-px bg-gray-200 my-2`}></View>
            </View>

            {/* Courier Account Button */}
            <View style={tw`mt-10`}>
                <CustomButton label='Courrier Account' onPress={() => setSwitchRole(true)} variant='solid' />
            </View>


            <FullPageModalLayout modalVisible={personalInfo} setModalVisible={setPersonalInfo} button={() => setPersonalInfo(false)}>
                {/* Profile Picture Section */}
                <View style={tw`items-center mt-2 mb-8`}>
                    <View style={tw`relative`}>
                        <Image
                            source={require('../../../assets/profile-image.png')} // Update path to your image
                            style={tw`w-28 h-28 rounded-full`}
                        />
                        <TouchableOpacity
                            style={tw`absolute top-0 right-0 bg-[#F26933] w-8 h-8 rounded-full items-center justify-center`}
                        >
                            <Feather name="plus" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <Text style={tw`text-[#F26933] text-center mt-3 font-medium`}>Edit Profile Photo</Text>
                    </TouchableOpacity>

                    <Text style={tw`text-gray-500 text-center mt-2 mx-8`}>
                        Add a profile picture to your account so couriers can recognize you
                    </Text>
                </View>

                {/* Personal Info Items */}
                <View style={tw`px-4`}>
                    {/* Name */}
                    <View style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
                        <View style={tw`flex-row items-center`}>
                            <Feather name="user" size={20} color="black" style={tw`mr-4`} />
                            <Text style={tw`text-lg font-medium`}>{userData.name}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={tw`text-[#F26933] font-medium`}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Phone Number */}
                    <View style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
                        <View style={tw`flex-row items-center`}>
                            <Feather name="smartphone" size={20} color="black" style={tw`mr-4`} />
                            <Text style={tw`text-lg font-medium`}>{userData.phone}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={tw`text-[#F26933] font-medium`}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Email */}
                    <View style={tw`flex-row items-center justify-between py-4 border-b border-gray-200`}>
                        <View style={tw`flex-row items-center`}>
                            <MaterialIcons name="email" size={20} color="black" style={tw`mr-4`} />
                            <Text style={tw`text-lg font-medium`}>{userData.email}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={tw`text-[#F26933] font-medium`}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </FullPageModalLayout>

            <FullPageModalLayout modalVisible={switchRole} setModalVisible={setSwitchRole} button={() => setSwitchRole(false)}>
                <View style={tw`p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Switch Your Role</Text>
                    <Text style={tw`text-gray-500 mb-5`}>You can switch later if needed.</Text>
                    <SelectionCard
                        description='Earn by delivering packages along your route.'
                        icon={<VehicleImg />}
                        handleClick={() => {}}
                        title='Individual Courier'
                    />
                    <SelectionCard
                        description='Manage a fleet and handle bulk deliveries.'
                        icon={<BuildingImg />}
                        handleClick={() => {}}
                        title='Business Courier'
                    />
                </View>
            </FullPageModalLayout>
        </LayoutPage>
    )
}

export default Account