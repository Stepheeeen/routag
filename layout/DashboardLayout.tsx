import { Image, ScrollView, Text,  View } from "react-native";
import tw from "twrnc";
import React, { ReactNode } from "react";

type DashboardProps = {
    headerContent: any;
    children: ReactNode;
};

const Dashboard: React.FC<DashboardProps> = ({ children, headerContent }) => {
    return (
        <ScrollView overScrollMode='never' style={tw`flex-1`}>
            {/* Header */}
            <View style={tw`relative w-full h-2/6`}>
                <Image source={require('assets/dashboard/dashboardBg.png')} style={tw`absolute w-full h-full`} />
                <View style={tw`p-4`}>{headerContent}</View>
            </View>

            {/* Features */}
            <View style={tw`p-4`}>{children}</View>
        </ScrollView>
    );
};

export default Dashboard;