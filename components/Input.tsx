// components/InputField.tsx
import { View, Text, TextInput } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';

type Props = {
  label: string;
  placeholder: string;
  icon: keyof typeof Feather.glyphMap;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export default function InputField({ label, placeholder, icon, secureTextEntry = false, value, onChangeText }: Props) {
  return (
    <View style={tw`mb-5`}>
      <Text style={tw`text-base font-semibold text-gray-700 mb-1`}>{label}</Text>
      <View style={tw`flex-row items-center border border-gray-300 rounded-xl px-4 py-3`}>
        <Feather name={icon} size={20} color="#999" />
        <TextInput
          style={tw`ml-2 flex-1 text-base`}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
        {value !== '' && <Feather name="check-circle" size={20} color="green" />}
      </View>
    </View>
  );
}
