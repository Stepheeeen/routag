// components/CustomButton.tsx
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';

type Props = {
  label: string;
  variant?: 'solid' | 'outline' | 'black';
  onPress: () => void;
};

export default function CustomButton({ label, variant , onPress }: Props) {
  const baseStyles = 'w-full py-4 rounded-full items-center justify-center mb-3';
  const solidStyles = 'bg-orange-500';
  const blackStyles = 'bg-black'
  const outlineStyles = 'border border-gray-800';

  const buttonStyle = tw`${baseStyles} ${
    variant === 'solid' ? solidStyles : variant === 'black' ? blackStyles : outlineStyles
  }`;
  const textStyle = tw`text-base font-semibold ${variant === 'solid' || variant === 'black' ? 'text-white' : 'text-black'}`;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, {cursor: "pointer"}]}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
