'use client'

import { useState, useRef } from 'react'
import { Avatar, Button, Box } from '@chakra-ui/react'
import { colors } from '@/styles/theme'

interface EditableAvatarProps {
  name: string
  src: string
  onAvatarChange: (file: File) => void
}

export default function EditableAvatar({
  name,
  src,
  onAvatarChange,
}: EditableAvatarProps) {
  const [avatarSrc, setAvatarSrc] = useState(src)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditClick = () => {
    fileInputRef.current?.click()
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
        onAvatarChange(file)
      } else {
        alert('Please select a valid image file (JPG, JPEG, PNG, or WebP)')
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
