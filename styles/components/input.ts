import { useColorModeValue } from '@chakra-ui/react';

export const Input = {
    baseStyle: {},
    sizes: {},
    variants: {
        search: () => ({
            color: useColorModeValue('purple.400', 'purple.500'),
            borderRadius: 10,
            borderColor: useColorModeValue('purple.300', 'purple.600'),
            w:'50%'
        }),
    }
}