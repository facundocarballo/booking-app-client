import { useColorModeValue } from '@chakra-ui/react';

export const Text = {
    baseStyle: {},
    sizes: {},
    variants: {
        empty: () => ({
            color: useColorModeValue('gray.400', 'gray.500'),
        }),
        description: () => ({
            color: useColorModeValue('gray.500', 'gray.400'),
        }),
    }
}