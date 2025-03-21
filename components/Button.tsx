// components/CustomButton.tsx
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';

type Props = {
  label: string;
  variant?: 'solid' | 'outline';
  onPress: () => void;
};

export default function CustomButton({ label, variant = 'solid', onPress }: Props) {
  const baseStyles = 'w-full py-3 rounded-full items-center justify-center mb-3';
  const solidStyles = 'bg-orange-500';
  const outlineStyles = 'border border-gray-800';

  const buttonStyle = tw`${baseStyles} ${variant === 'solid' ? solidStyles : outlineStyles}`;
  const textStyle = tw`text-base font-semibold ${variant === 'solid' ? 'text-white' : 'text-black'}`;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
