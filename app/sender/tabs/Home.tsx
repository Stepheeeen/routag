import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import { Ionicons, MaterialIcons, Feather, Entypo, AntDesign } from "@expo/vector-icons";
import CustomButton from "~/components/Button";
import Map from "~/components/Map";
import LayoutPage from "~/layout/PageLayout";
import FullPageModalLayout from "~/layout/FullPageModalLayout";
import InputField from "~/components/Input";
import { MapIcon } from "~/assets/svgs";

const DeliveryDetails = () => {
  const [fragilePackage, setFragilePackage] = useState(false);
  const [packageCount, setPackageCount] = useState('1');
  const [packageWeight, setPackageWeight] = useState('12');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [offerPrice, setOfferPrice] = useState('2700');

  return (
    <>
      {/* Delivery details header */}
      <View style={tw`mb-2`}>
        <Text style={tw`text-2xl font-bold`}>Delivery Details</Text>
        <Text style={tw`text-gray-600 mt-1`}>Fill in the details of your delivery</Text>
      </View>

      {/* Origin and destination */}
      <View style={tw`my-4`}>
        <View style={tw`flex-row items-center mb-5`}>
          <View style={tw`h-6 w-6 rounded-full bg-white border-2 border-orange-500 items-center justify-center`}>
            <View style={tw`h-3 w-3 rounded-full bg-orange-500`}></View>
          </View>
          <Text style={tw`ml-2 text-base font-medium`}>Obafemi Awolowo way</Text>
        </View>

        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`h-6 w-6 rounded-full bg-white border-2 border-orange-500 items-center justify-center`}>
              <View style={tw`h-3 w-3 rounded-full bg-orange-500`}></View>
            </View>
            <Text style={tw`ml-2 text-base font-medium`}>37A Opebi Road</Text>
          </View>

          <TouchableOpacity style={tw`bg-orange-500 py-2 px-3 rounded-full flex-row items-center`}>
            <AntDesign name="plus" size={16} color="white" />
            <Text style={tw`text-white text-sm ml-1`}>Add Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`ml-3 h-12 border-l border-dashed border-orange-500`}></View>
      </View>

      {/* Package details */}
      <View style={tw`flex-row justify-between mb-4`}>
        <View style={tw`w-5/12`}>
          <Text style={tw`text-gray-600 mb-2`}># of Package</Text>
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg bg-white overflow-hidden`}>
            <TextInput
              style={tw`py-3 px-4 text-base flex-1`}
              value={packageCount}
              onChangeText={setPackageCount}
              keyboardType="numeric"
            />
            <View style={tw`border-l border-gray-300 h-full flex-row items-center px-2`}>
              <Text style={tw`text-xs text-gray-400`}>Max 25</Text>
              <Feather name="chevron-down" size={20} color="black" style={tw`ml-1`} />
            </View>
          </View>
        </View>

        <View style={tw`w-6/12`}>
          <Text style={tw`text-gray-600 mb-2`}>Weight per pacakge</Text>
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg bg-white overflow-hidden`}>
            <TextInput
              style={tw`py-3 px-4 text-base flex-1`}
              value={packageWeight}
              onChangeText={setPackageWeight}
              keyboardType="numeric"
            />
            <View style={tw`border-l border-gray-300 h-full flex-row items-center px-3`}>
              <Text style={tw`text-base`}>{weightUnit}</Text>
              <Feather name="chevron-down" size={20} color="black" style={tw`ml-1`} />
            </View>
          </View>
          <Text style={tw`text-xs text-gray-400 mt-1`}>Max Weight 20kg</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={tw`h-px bg-gray-300 my-4`}></View>

      {/* Fragile package option */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-base font-medium`}>Fragile Package</Text>
        <TouchableOpacity
          style={tw`h-6 w-6 rounded-full ${fragilePackage ? 'bg-orange-500' : 'border border-gray-300 bg-white'}`}
          onPress={() => setFragilePackage(!fragilePackage)}
        >
          {fragilePackage && (
            <View style={tw`items-center justify-center h-full`}>
              <Feather name="check" size={16} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Another divider */}
      <View style={tw`h-px bg-gray-300 my-4`}></View>

      {/* Package description */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600 mb-2`}>What do you want to deliver?*</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg bg-white py-3 px-4 text-base`}
          placeholder="Describe Package"
          placeholderTextColor="#999"
        />
      </View>

      {/* Receiver's information */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600 mb-2`}>Receivers Name*</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg bg-white py-3 px-4 text-base`}
          placeholder="Enter Receivers Name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600 mb-2`}>Receivers Phone Number*</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg bg-white py-3 px-4 text-base`}
          placeholder="Enter Receivers Phone Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      {/* Product value */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600 mb-2`}>Product value</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg bg-white py-3 px-4 text-base`}
          placeholder="Enter product value"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        <Text style={tw`text-xs text-orange-500 mt-1`}>Enter product for safety purposes (Value will not be reviled to courier)</Text>
      </View>

      {/* Upload license */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600 mb-2`}>Upload Product Image</Text>
        <TouchableOpacity style={tw`border border-gray-300 rounded-lg bg-white py-4 px-4 items-center justify-center`}>
          <Text style={tw`text-gray-500`}>Click here to upload Licence</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={tw`h-px bg-gray-300 my-4`}></View>

      {/* Wallet balance */}
      <View style={tw`mb-4`}>
        <View style={tw`bg-red-200 rounded-full px-4 py-2 self-start`}>
          <Text style={tw`text-sm`}>Wallet Balance : <Text style={tw`font-bold`}>₦806,000,00</Text></Text>
        </View>
      </View>

      {/* Price offer */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-600 mb-2`}>Offer your price</Text>
        <View style={tw`border border-gray-300 rounded-lg bg-white py-3 px-4`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-base font-medium mr-1`}>₦</Text>
            <TextInput
              style={tw`text-xl font-bold flex-1`}
              value={offerPrice}
              onChangeText={setOfferPrice}
              keyboardType="numeric"
            />
          </View>
          <Text style={tw`text-xs text-gray-400 mt-1`}>Recommended: 3,000</Text>
        </View>
      </View>

      {/* Find courier button */}
      <TouchableOpacity style={tw`bg-orange-500 py-4 rounded-lg items-center justify-center mb-6`}>
        <Text style={tw`text-white text-lg font-bold`}>Find Courier</Text>
      </TouchableOpacity>
    </>
  )
}

const LocationCard = ({ handleClick, handleSendPackage }: { handleClick: any; handleSendPackage: any; }) => {
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
      <TouchableOpacity style={tw`bg-gray-100 flex-row items-center rounded-xl px-4 py-3 mb-5`} onPress={handleClick}>
        <Feather name="search" size={18} color="gray" />
        <TextInput
          placeholder="To Where"
          placeholderTextColor="#999"
          style={tw`ml-2 text-sm`}
          editable={false}
          onPress={handleClick}
        />
      </TouchableOpacity>

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

      <CustomButton label="Send package" onPress={handleSendPackage} variant="solid" />
    </View>
  );
};

const MapScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryPackageModal, setDeliveryPackageModal] = useState(false);
  // Sample destination suggestions
  const suggestions = [
    { id: '1', name: 'Admiralty Way', area: 'Lekki Lagos' },
    { id: '2', name: '37A Opebi Road', area: 'Ikeja Lagos' },
    { id: '3', name: '37A Opebi Road', area: 'Ikeja Lagos' },
    { id: '4', name: '37A Opebi Road', area: 'Ikeja Lagos' },
  ];

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
      <LocationCard handleClick={() => setModalVisible(true)} handleSendPackage={() => setDeliveryPackageModal(true)} />
      {/* </View> */}

      <FullPageModalLayout modalVisible={modalVisible} setModalVisible={setModalVisible} button={() => setModalVisible(false)} classname={"p-2"}>
        <View style={tw`mx-2 my-2 p-4 bg-white rounded-xl border border-gray-200`}>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="location-on" size={24} color="#FF6B37" />
            <TextInput
              style={tw`ml-2 text-[16px] flex-1`}
              placeholder="Enter Destination"
              value="Obafemi Awolowo way"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Destination Input */}
        <View style={tw`mx-2 my-2 p-4 bg-white rounded-xl border border-gray-200 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center flex-1`}>
            <Feather name="search" size={20} color="#666" />
            <TextInput
              style={tw`ml-2 text-[16px] flex-1`}
              placeholder="Enter Destination"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity>
            <MapIcon />
          </TouchableOpacity>
        </View>

        {/* Destination Suggestions */}
        <ScrollView style={tw`mt-4`}>
          {suggestions.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity style={tw`flex-row items-center px-4 py-3`}>
                <View style={tw`h-8 w-8 rounded-full bg-gray-200 items-center justify-center`}>
                  <Ionicons name="time-outline" size={18} color="#666" />
                </View>
                <View style={tw`ml-3`}>
                  <Text style={tw`text-base font-medium`}>{item.name}</Text>
                  <Text style={tw`text-sm text-gray-600`}>{item.area}</Text>
                </View>
              </TouchableOpacity>
              {index < suggestions.length - 1 && (
                <View style={tw`h-px bg-gray-200 mx-4`} />
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      </FullPageModalLayout>

      <FullPageModalLayout modalVisible={deliveryPackageModal} setModalVisible={setDeliveryPackageModal} button={() => setDeliveryPackageModal(false)} classname={"p-4"}>
        <DeliveryDetails />
      </FullPageModalLayout>
    </LayoutPage>
  );
};

export default MapScreen;
