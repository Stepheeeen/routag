import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';

interface FullPageModalLayoutProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    children: ReactNode;
    classname?: any
    button?: any
}

const FullPageModalLayout: React.FC<FullPageModalLayoutProps> = ({ modalVisible, setModalVisible, children, classname, button }) => {
    const closeModal = () => setModalVisible(false);
    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            // animationType="fade"
            onRequestClose={closeModal}
        >
            {/* Your modal content goes here */}
            <View style={tw`flex-1 bg-[#F3F3F4] mt-[12%]`}>
                {/* Header with Back Button */}
                <View style={tw`flex-row items-center justify-between px-4 pt-7`}>
                    <TouchableOpacity
                        onPress={closeModal}
                        style={tw`w-10 h-10 rounded-full border border-gray-300 bg-white items-center justify-center`}
                    >
                        <Ionicons name="chevron-back" size={20} color="#FF6400" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={tw`flex-1 rounded-t-3xl`} overScrollMode='never'>
                    {/* Body */}
                    <View style={tw`flex-1 p-4 relative ${classname}`}>
                        {children}
                    </View>

                    {/* <View style={tw`p-2 my-5`}>
                        {button}
                    </View> */}
                </ScrollView>
            </View>
        </Modal>
    )
}

export default FullPageModalLayout