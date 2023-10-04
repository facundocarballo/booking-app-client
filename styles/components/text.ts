import { useColorModeValue } from '@chakra-ui/react';

export const Text = {
    baseStyle: {},
    sizes: {},
    variants: {
        empty: () => ({
            color: useColorModeValue('gray.400', 'gray.500'),
        }),
    }
}