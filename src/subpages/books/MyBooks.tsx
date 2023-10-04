import React from 'react';
import { VStack, HStack, Heading, Spacer, Button, Box, Text } from '@chakra-ui/react'

export const MyBooks = () => {
   // Attributes
   // Context
   const books: string[] = [];
   // Methods
   // Component
   return(
      <>
        <VStack w='full'>
            <HStack w='full'>
                <Box w='10px' />
                <Heading>My Books</Heading>
                <Spacer />
            </HStack>
            <Box h='10px' />
            {
                books.length > 0 ?
                books.map((b, idx) => <Text key={idx}>{b}</Text>) :
                <Text variant='empty'>
                    {"Don't have a book appointment yet."}
                </Text>
            }
        </VStack>
      </>
   );
}