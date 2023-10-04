import { useColorModeValue } from "@chakra-ui/react";

export const styles = {
    global: () => ({
        body: {
            bg: useColorModeValue('light.bg', 'dark.bg')
        }
    })
}