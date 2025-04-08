import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import { Ionicons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import CustomButton from "~/components/Button";
import Map from "~/components/Map";
import LayoutPage from "~/layout/PageLayout";

const LocationCard = () => {
  return (
    <View style={tw`absolute bottom-0 w-full bg-white rounded-t-3xl px-5 pt-5 pb-4 shadow-lg`}>
      {/* Pickup Location */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={tw`flex-row items-center`}>
          <Entypo name="location-pin" size={20} color="#F97316" />
          <Text style={tw`text-base font-semibold text-gray-800 ml-1`}>
            Obafemi Awolowo way
          </Text>
        </View>
        <TouchableOpacity style={tw`flex-row items-center bg-gray-100 px-3 py-1 rounded-full`}>
          <Feather name="search" size={14} color="black" />
          <Text style={tw`ml-1 text-xs font-medium`}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Destination Input */}
      <View style={tw`bg-gray-100 flex-row items-center rounded-xl px-4 py-3 mb-5`}>
        <Feather name="search" size={18} color="gray" />
        <TextInput
          placeholder="To Where"
          placeholderTextColor="#999"
          style={tw`ml-2 flex-1 text-sm`}
        />
      </View>

      {/* Previous Locations */}
      <ScrollView style={tw`max-h-36`} showsVerticalScrollIndicator={false}>
        {[{
          title: "Admiralty Way",
          subtitle: "Lekki Lagos"
        }, {
          title: "37A Opebi Road",
          subtitle: "Ikeja Lagos"
        }].map((loc, i) => (
          <View key={i} style={tw`flex-row items-start mb-4`}>
            <MaterialIcons name="access-time" size={20} color="#AAA" style={tw`mt-1`} />
            <View style={tw`ml-3`}>
              <Text style={tw`text-sm font-medium text-gray-800`}>{loc.title}</Text>
              <Text style={tw`text-xs text-gray-500`}>{loc.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <CustomButton label="Send package" onPress={() => { }} variant="solid" />
    </View>
  );
};

const MapScreen = () => {
  const markers = [
    { latitude: 6.5244, longitude: 3.3792, title: "Marker 1", description: "Lagos" },
    { latitude: 6.5300, longitude: 3.3750, title: "Marker 2", description: "Somewhere else" },
  ];
  return (
    <LayoutPage noscroll={true}>
      {/* <View style={tw`flex-1 bg-white`}> */}
        {/* Map Placeholder */}
        <Map markers={markers} />

        {/* Top Left Menu FAB */}
        <TouchableOpacity
          style={tw`absolute top-14 left-5 bg-white p-3 rounded-full shadow-lg z-10`}
        >
          <Feather name="menu" size={20} color="#FF6400" />
        </TouchableOpacity>

        {/* Bottom Card */}
        <LocationCard />
      {/* </View> */}
    </LayoutPage>
  );
};

export default MapScreen;
