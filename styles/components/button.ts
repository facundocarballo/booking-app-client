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
        })
    }
}