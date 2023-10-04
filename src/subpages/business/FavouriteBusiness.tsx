import React from 'react';
import { VStack, HStack, Heading, Spacer, Button, Box, Text } from '@chakra-ui/react'

export const FavouriteBusiness = () => {
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
                <Heading>Favourite Business</Heading>
                <Spacer />
                <Button variant='callToAction'>
                    Search Business
                </Button>
                <Box w='10px' />
            </HStack>
            <Box h='10px' />
            {
                business.length > 0 ?
                business.map((b, idx) => <Text key={idx}>{b}</Text>) :
                <Text variant='empty'>
                    {"Don't have a favourite business yet? Search one now! :)"}
                </Text>
            }
        </VStack>
      </>
   );
}