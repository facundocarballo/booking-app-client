import React from 'react';
import { VStack, HStack, Heading, Spacer, Button, Box, Text } from '@chakra-ui/react'

export const MyBusiness = () => {
   // Attributes
   // Context
   const business: string[] = [];
   // Methods
   // Component
   return(
      <>
        <VStack w='full'>
            <HStack w='full'>
                <Box w='10px' />
                <Heading>Your Business</Heading>
                <Spacer />
                <Button variant='callToAction'>
                    Create Business
                </Button>
                <Box w='10px' />
            </HStack>
            <Box h='10px' />
            {
                business.length > 0 ?
                business.map((b, idx) => <Text key={idx}>{b}</Text>) :
                <Text variant='empty'>
                    {"Don't have a business yet? Create one now! It's Free. :)"}
                </Text>
            }
        </VStack>
      </>
   );
}