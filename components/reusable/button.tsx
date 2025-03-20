// components/CustomButton.tsx
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import "../../global.css"
const StyledTouchable = TouchableOpacity;


type Props = {
    label: string;
    variant?: 'solid' | 'outline';
    onPress: () => void;
};

export default function CustomButton({ label, variant = 'solid', onPress }: Props) {
    const baseStyles =
        'w-full py-3 rounded-full items-center justify-center mb-3';
    const solidStyles = 'bg-orange-500';
    const outlineStyles = 'border border-gray-800';

    return (
        <StyledTouchable
            onPress={onPress}
            className={`${baseStyles} ${variant === 'solid' ? solidStyles : outlineStyles}`}
        >
            <Text
                className={`text-base font-semibold ${variant === 'solid' ? 'text-white' : 'text-black'
                    }`}
            >
                {label}
            </Text>
        </StyledTouchable>
    );
}