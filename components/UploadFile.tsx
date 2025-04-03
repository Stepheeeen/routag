import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons"; // Using Material Icons from Expo Vector Icons

const UploadDocumentInput = ({ label = 'Upload Valid Licence' }: { label?: string; }) => {
    const [document, setDocument] = useState<DocumentPicker.DocumentPickerResult | null>(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
            });

            if (result.canceled) return;
            setDocument(result);
        } catch (error) {
            console.error("Error picking document:", error);
        }
    };

    return (
        <>
            {label && (
                <Text style={tw`text-[#100F0D] text-[16px] font-medium mb-2`}>
                    {label}
                </Text>
            )}
            <View style={tw`p-3 bg-white rounded-lg mb-5`}>
                <TouchableOpacity
                    onPress={pickDocument}
                    style={tw`flex justify-center pl-4`}
                >
                    {/* <MaterialIcons name="cloud-upload" size={32} color="#4B5563" /> */}
                    <Text style={tw`text-[#100F0D] text-[17px] mt-2`}>
                        {document ? "Replace Document" : "Click here to upload Licence "}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default UploadDocumentInput;