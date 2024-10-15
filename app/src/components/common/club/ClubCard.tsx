import React from 'react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import { colors } from '@/styles/theme'

interface ClubCardProps {
  imageSrc: string
  altText: string
  heading: string
  description: string
}

const ClubCard: React.FC<ClubCardProps> = ({
  imageSrc,
  altText,
  heading,
  description,
}) => {
  return (
    <Box
      bg={colors.brandRed} // Dark grey for cards
      p={4}
      shadow='md'
      borderRadius='md'
      textAlign='center'
      maxW={{ base: '100%', sm: '300px' }} // Responsive width
      height='400px' // Fixed height for the cards
    >
      <Image
        src={imageSrc}
        alt={altText}
        borderRadius='md'
        mb={4}
        boxSize={{ base: '150px', sm: '150px' }} // Fixed image size
        objectFit='contain' // Scale down the image to fit without cropping
        mx='auto' // Center the image
        mt={4} // Add margin at the top for spacing
      />
      <Heading as='h3' size='md' mb={2} color={colors.brandWhite}>
        {heading}
      </Heading>
      <Text color={colors.brandWhite}>{description}</Text>
    </Box>
  )
}

export default ClubCard
