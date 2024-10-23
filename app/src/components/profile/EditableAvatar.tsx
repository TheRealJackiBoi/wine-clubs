'use client'

import { useState, useRef } from 'react'
import { Avatar, Button, Box, useToast } from '@chakra-ui/react'
import { colors } from '@/styles/theme'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface EditableAvatarProps {
  name: string
  userId: string
  src: string
}

export default function EditableAvatar({
  name,
  userId,
  src,
}: EditableAvatarProps) {
  const toast = useToast()
  const router = useRouter()

  const [avatarSrc, setAvatarSrc] = useState(src)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (file: File, userId: string) => {
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result as string
      try {
        const result = await axios.post(`/api/users/${userId}/avatar`, {
          img: base64String,
          fileName: file.name.split('.')[0],
        })

        const data = result.data

        if (data.success) {
          toast({
            title: 'Avatar updated',
            description: data.message,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Error',
            description: data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.error(error)

        const errorMessage =
          axios.isAxiosError(error) && error.response
            ? error.response.data.message
            : 'An unexpected error occurred.'

        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    reader.readAsDataURL(file) // Convert file to base64
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      if (validTypes.includes(file.type)) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setAvatarSrc(e.target?.result as string)
        }
        reader.readAsDataURL(file)
        handleFileUpload(file, userId)
      } else {
        toast({
          title: 'Error',
          description:
            'Please select a valid image file (JPG, JPEG, PNG, or WebP)',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <Box position='relative' display='inline-block'>
      <Avatar size='2xl' name={name} src={avatarSrc} />
      <Button
        position='absolute'
        bottom={0}
        left={0}
        w='full'
        h='30px'
        bg={colors.brandRed}
        color='white'
        _hover={{ bg: colors.brandRedDark }}
        borderRadius='full'
        onClick={handleEditClick}
      >
        Edit
      </Button>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='image/jpeg,image/png,image/jpg,image/gif,image/webp'
        onChange={handleFileChange}
      />
    </Box>
  )
}
