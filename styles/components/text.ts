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
        alert: () => ({
            color: useColorModeValue('red.300', 'red.600'),
            fontWeight: 'bold'
        }),
        caption: () => ({
            color: useColorModeValue('gray.900', 'gray.100'),
            fontWeight: 'bold',
            fontSize: '20px'
        }),
        link: () => ({
            color: useColorModeValue('purple.300', 'purple.600'),
            fontWeight: 'bold',
            fontSize: '15px',
            textDecoration: 'underline'
        })
    }
}