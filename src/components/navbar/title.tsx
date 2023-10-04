import { HStack, Container, Heading } from "@chakra-ui/react";

export interface ITitle {
    title?: string
}

export const Title = ({title}: ITitle) => {
    return (
        <HStack>
            <Container maxW='2em'/>
            <Heading as='h1' fontSize={{base: 'xl', sm: '2xl', md: '4xl'}}>
                {title}
            </Heading>
        </HStack>
    )
}