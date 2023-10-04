import { useColorModeValue } from '@chakra-ui/react';

export const Button = {
    baseStyle: {},
    sizes: {},
    variants: {
        navbar: () => ({
            bg: useColorModeValue('bgLight', 'bgDark'),
            color: useColorModeValue('bgDark', 'bgLight'),
            margin: '2px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.02)',
                bg: useColorModeValue('gray.300', 'gray.600'),
            }
        }),
        callToAction: () => ({
            bg: useColorModeValue('purple.300', 'purple.600'),
            color: useColorModeValue('bgDark', 'bgLight'),
            margin: '2px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.10)',
                bg: useColorModeValue('purple.400', 'purple.500'),
            }
        })
    }
}