// screens/SignUpScreen.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import InputField from '~/components/Input';
import { Link, router } from 'expo-router';
import CustomButton from '~/components/Button';
import LayoutPage from '~/layout/PageLayout';
import { BuildingImg, PackageImg, VehicleImg } from '~/assets/svgs/image';
import { SelectField } from '~/components/Select';
import { TravelMeans, VehicleColor, VehicleType } from '~/db/options';
import UploadDocumentInput from '~/components/UploadFile';
import FullPageModalLayout from '~/layout/FullPageModalLayout';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Drivers, Vehicles } from '~/db/register';
import { postRequest } from '~/api/requests/postRequest';
import Toast from '~/components/Toast';
import { passRoute, UserAuthentication } from '~/utils/authentication.flow';

export const SelectionCard = ({ title, description, icon, handleClick }: { title: string; description: string; icon: any; handleClick: () => void }) => {
  return (
    <TouchableOpacity style={tw`bg-white rounded-xl mb-4 p-4 flex-row justify-between items-center shadow-sm`} onPress={handleClick}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-orange-500 text-xl font-bold mb-1`}>{title}</Text>
        <Text style={tw`text-gray-700`}>{description}</Text>
      </View>
      <View style={tw`ml-4`}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default function SignUpScreen() {
  const [role, setRole] = useState<'sender' | 'individualCourier' | 'businessCourier' | ''>("")
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
  const [vehicleStep, setVehicleStep] = useState(0);
  const [driverStep, setDriverStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfVehicles, setNumberOfVehicles] = useState(0);
  const [numberOfDrivers, setNumberOfDrivers] = useState(0);
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const [vehicleColor, setVehicleColor] = useState(null);
  const [travelMeans, setTravelMeans] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const openModal2 = () => setModal2Visible(true);
  const closeModal2 = () => setModal2Visible(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = useState('')

  const handleSenderCreateAccount = async () => {
    if (!name || !email || !password || !phone) {
      setToastType('error');
      setToastMessage("Please fill all required fields");
      setShowToast(true);

      // Reset toast state after a delay
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setLoading(true);
      try {
        const response = await postRequest.registerCustomer(name, email, password, phone);
        console.log(response.data);

        setToastType('success');
        setToastMessage(response.data.message);
        setShowToast(true);

        // Reset toast state after a delay
        setTimeout(() => setShowToast(false), 3000);
        UserAuthentication.email = email;
        passRoute.url = '/sender/tabs/Home'

        setTimeout(() => router.push('/authentication/verification'), 5000)

      } catch (error: any) {
        setToastType('error');
        setToastMessage(error.response?.data?.message || "An error occurred");
        setShowToast(true);

        // Reset toast state after a delay
        setTimeout(() => setShowToast(false), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <LayoutPage>
      <View style={tw`p-4 ${role === '' ? '' : 'hidden'}`}>
        <Text style={tw`text-xl font-bold mb-2`}>Choose Your Role</Text>
        <Text style={tw`text-gray-500 mb-5`}>You can switch later if needed.</Text>
        <SelectionCard
          description='Send packages to any destination.'
          icon={<PackageImg />}
          handleClick={() => setRole("sender")}
          title='Sender'
        />
        <SelectionCard
          description='Earn by delivering packages along your route.'
          icon={<VehicleImg />}
          handleClick={() => setRole("individualCourier")}
          title='Individual Courier'
        />
        <SelectionCard
          description='Manage a fleet and handle bulk deliveries.'
          icon={<BuildingImg />}
          handleClick={() => setRole("businessCourier")}
          title='Business Courier'
        />

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-[#100F0D]`}>Already have an account?</Text>
          <Link href="/authentication/login" style={tw`text-[#FF6400] ml-1`}>
            Sign in
          </Link>
        </View>
      </View>

      {
        role === 'sender' ? (
          <View style={tw`p-4`}>
            <Text style={tw`text-xl font-bold mb-2`}>Sign Up as a Sender</Text>
            <Text style={tw`text-gray-500 mb-5`}>Easily send packages to any destination with trusted couriers.</Text>

            <View style={tw`my-4`}>
              <InputField label="Full Name" placeholder="Enter Full Name" value={name} onChangeText={setName} />
              <InputField label="Phone Number" placeholder="Enter Phone Number" value={phone} onChangeText={setPhone} />
              <InputField label="Email" placeholder="Enter Email" value={email} onChangeText={setEmail} />
              <InputField label="Create Password" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

              <Text style={tw`mb-4 items-center`}>
                By clicking sign up you’re agreeing with out{" "}
                <Link href={"/"} style={tw`text-orange-500`}>Terms & Conditions & Privacy Policies</Link>
              </Text>
            </View>

            <CustomButton label='Sign Up' onPress={() => handleSenderCreateAccount()} variant='solid' loading={loading} />

            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-[#100F0D]`}>Already have an account?</Text>
              <Link href="/authentication/login" style={tw`text-[#FF6400] ml-1`}>
                Sign in
              </Link>
            </View>
          </View>
        ) : role === 'individualCourier' ? (
          <View style={tw`p-4`}>
            <Text style={tw`text-xl font-bold mb-2`}>Sign Up as a Courier</Text>
            <Text style={tw`text-gray-500 mb-5`}>Earn money by delivering packages along your travel route.</Text>

            <View style={tw`my-4`}>
              <InputField label="Full Name" placeholder="Enter Full Name" value={name} onChangeText={setName} />
              <InputField label="Phone Number" placeholder="Enter Phone Number" value={password} onChangeText={setPassword} />
              <InputField label="Email" placeholder="Enter Email" value={email} onChangeText={setEmail} />
              <InputField label="Create Password" placeholder="Password" value={ConfirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
              <SelectField
                label="Means of Travel"
                placeholder="Select Your Travel Means "
                options={TravelMeans}
                value={travelMeans}
                onChange={(value: any) => setTravelMeans(value)}
              />
              <SelectField
                label="Vehicle type"
                placeholder="Select Your Vehicle type"
                options={VehicleType}
                value={vehicleType}
                onChange={(value: any) => setVehicleType(value)}
              />
              <SelectField
                label="Vehicle color"
                placeholder="Select Your Vehicle color"
                options={VehicleColor}
                value={vehicleColor}
                onChange={(value: any) => setVehicleColor(value)}
              />
              <InputField label="Vehicle Maker/Brand" placeholder="Enter Vehicle Maker/Brand" value={email} onChangeText={setEmail} />

              <InputField label="Vehicle Plate Number" placeholder="Enter Plate Number" value={email} onChangeText={setEmail} />

              <UploadDocumentInput />

              <Text style={tw`mb-4 items-center`}>
                By clicking sign up you’re agreeing with out{" "}
                <Link href={"/"} style={tw`text-orange-500`}>Terms & Conditions & Privacy Policies</Link>
              </Text>
            </View>

            <CustomButton label='Sign Up' onPress={() => router.push("/authentication/verification")} variant='solid' />

            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-[#100F0D]`}>Already have an account?</Text>
              <Link href="/authentication/create-account" style={tw`text-[#FF6400] ml-1`}>
                Sign in
              </Link>
            </View>
          </View>
        ) : role === 'businessCourier' ? (
          <View style={tw`p-4`}>
            <Text style={tw`text-xl font-bold mb-2`}>Sign Up as a Business</Text>
            <Text style={tw`text-gray-500 mb-5`}>Manage a fleet and handle bulk deliveries with ease.</Text>

            <View style={tw`my-4`}>
              <InputField label="Full Name" placeholder="Enter Full Name" value={name} onChangeText={setName} />
              <InputField label="Phone Number" placeholder="Enter Phone Number" value={password} onChangeText={setPassword} />
              <InputField label="Email" placeholder="Enter Email" value={email} onChangeText={setEmail} />
              <InputField label="Create Password" placeholder="Password" value={ConfirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
              <InputField label="Number of Vehicle" placeholder="Enter Number of Vehicle" value={numberOfVehicles.toString()} onChangeText={(text) => setNumberOfVehicles(Number(text))} />
              <InputField
                label="Number of Drivers"
                placeholder="Enter Number of Drivers"
                value={numberOfDrivers.toString()}
                onChangeText={(text) => setNumberOfDrivers(Number(text))}
              />
              <UploadDocumentInput label="Upload CAC Registration Document" />

              <Text style={tw`mb-4 items-center`}>
                By clicking sign up you’re agreeing with out{" "}
                <Link href={"/"} style={tw`text-orange-500`}>Terms & Conditions & Privacy Policies</Link>
              </Text>
            </View>

            <CustomButton label='Proceed' onPress={openModal} variant='solid' />


            <FullPageModalLayout
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              classname={''}>

              <Text style={tw`text-xl font-bold mb-2`}>Register Your Vehicles</Text>
              <Text style={tw`text-gray-500 mb-5`}>Register each vehicle in your fleet.</Text>
              {vehicleStep === 0 && (
                <>
                  {Vehicles.map((vehicle) => (
                    <View key={vehicle.id}>
                      <TouchableOpacity
                        style={tw`flex-row items-center justify-between py-4`}
                        onPress={() => setVehicleStep(1)}
                      >
                        <View style={tw`flex-row items-center`}>
                          <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#000" />
                          <Text style={tw`text-lg ml-4`}>{vehicle.name}</Text>
                        </View>
                        <View style={tw`flex-row items-center`}>
                          <Text style={tw`text-sm text-red-500 mr-2`}>Unregistered</Text>
                          <Ionicons name="chevron-forward" size={18} color="#000" />
                        </View>
                      </TouchableOpacity>
                      <View style={tw`h-px bg-gray-200`} />
                    </View>
                  ))}

                  <View style={tw`p-2 my-5`}><CustomButton label='Proceed' onPress={() => { openModal2(); closeModal(); }} variant='solid' /></View>
                </>
              )}

              {vehicleStep === 1 && (
                <>
                  <SelectField
                    label="Vehicle type"
                    placeholder="Select Your Vehicle type"
                    options={VehicleType}
                    value={vehicleType}
                    onChange={(value: any) => setVehicleType(value)}
                  />
                  <InputField label="Vehicle Maker/Brand" placeholder="Enter Vehicle Maker/Brand" value={email} onChangeText={setEmail} />
                  <SelectField
                    label="Vehicle color"
                    placeholder="Select Your Vehicle color"
                    options={VehicleColor}
                    value={vehicleColor}
                    onChange={(value: any) => setVehicleColor(value)}
                  />
                  <InputField label="Vehicle Plate Number" placeholder="Enter Plate Number" value={email} onChangeText={setEmail} />

                  <View style={tw`p-2 my-5`}><CustomButton label='Save' onPress={() => setVehicleStep(0)} variant='solid' /></View>
                </>
              )}

            </FullPageModalLayout>

            <FullPageModalLayout
              modalVisible={modal2Visible}
              setModalVisible={setModal2Visible}
              classname={''}>

              <Text style={tw`text-xl font-bold mb-2`}>Register Your Drivers</Text>
              <Text style={tw`text-gray-500 mb-5`}>Manage a fleet and handle bulk deliveries with ease.</Text>
              {driverStep === 0 && (
                <>
                  {Drivers.map((Driver) => (
                    <View key={Driver.id}>
                      <TouchableOpacity
                        style={tw`flex-row items-center justify-between py-4`}
                        onPress={() => setDriverStep(1)}
                      >
                        <View style={tw`flex-row items-center`}>
                          <MaterialCommunityIcons name="steering" size={24} color="#000" />
                          <Text style={tw`text-lg ml-4`}>{Driver.name}</Text>
                        </View>
                        <View style={tw`flex-row items-center`}>
                          <Text style={tw`text-sm text-red-500 mr-2`}>Unregistered</Text>
                          <Ionicons name="chevron-forward" size={18} color="#000" />
                        </View>
                      </TouchableOpacity>
                      <View style={tw`h-px bg-gray-200`} />
                    </View>
                  ))}

                  <View style={tw`p-2 my-5`}><CustomButton label='Sign up' onPress={() => router.push("/authentication/verification")} variant='solid' /></View>
                </>
              )}

              {driverStep === 1 && (
                <>
                  <InputField label="Driver Name" placeholder="Enter Name" value={name} onChangeText={setName} />
                  <InputField label="Driver Username" placeholder="Create Username" value={email} onChangeText={setEmail} />
                  <InputField label="Phone Number" placeholder="Enter Phone Number" value={password} onChangeText={setPassword} />
                  <InputField label="Create Password" placeholder="Password" value={ConfirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                  <SelectField
                    label="Assigned Vehicle"
                    placeholder="Select Assigned Vehicle"
                    options={VehicleType}
                    value={vehicleType}
                    onChange={(value: any) => setTravelMeans(value)}
                  />
                  <UploadDocumentInput />
                  <View style={tw`p-1 my-5`}><CustomButton label='Save' onPress={() => setDriverStep(0)} variant='solid' /></View>
                </>
              )}

            </FullPageModalLayout>
          </View>
        ) : ('')
      }

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
        />
      )}
    </LayoutPage>
  );
}