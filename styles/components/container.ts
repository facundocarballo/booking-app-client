import { useColorModeValue } from '@chakra-ui/react';

export const Container = {
    variants: {
        businessCard: () => ({
            bg: useColorModeValue('gray.200', 'gray.700'),
            borderRadius: 10,
            margin: '2px',
            minW: "400px",
            minH: "220px",
            maxH: "220px",
            _hover: {
                boxShadow: 'lg',
                transform: 'scale(1.05)',
                bg: useColorModeValue('gray.300', 'gray.600'),
                cursor: 'pointer'
            }
        }),
        branchCard: () => ({
            bg: useColorModeValue('gray.200', 'gray.700'),
            borderRadius: 10,
            margin: '2px',
            minW: "400px",
            minH: "220px",
            maxH: "220px",
            _hover: {
                boxShadow: 'lg',
                transform: 'scale(1.05)',
                cursor: 'pointer'
            }
        }),
    }
}