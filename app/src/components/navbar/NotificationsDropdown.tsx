'use client'
import { colors } from '@/styles/theme'
import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { NotificationType } from '@prisma/client'
import axios from 'axios'
import { MdNotifications } from 'react-icons/md'

type Props = {
  notifications: {
    id: string
    message: string
    type: NotificationType
    createdAt: Date
    isSeen: boolean
    userId: string
    club: {
      id: string
      name: string
      description: string
      image: string
      clubOwnerId: string
      createdAt: Date
    } | null
    clubId: string | null
    endDate: Date | null
  }[]
}

const NotificationsDropdown = ({ notifications }: Props) => {
  const toast = useToast()

  const handleAccept = async (
    clubId: string,
    userId: string,
    notificationId: string,
    clubName: string,
  ) => {
    try {
      const result = await axios.post<{ success: boolean; message: string }>(
        `/api/clubs/${clubId}/invite/${notificationId}`,
        { userId: userId },
      )
      console.log(result)
      const data = result.data
      if (data.success) {
        toast({
          title: 'Invitation accepted',
          description: `You've joined ${clubName}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error',
          description: data.message || `Failed to join ${clubName}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred when joining club.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<MdNotifications />}
        aria-label='Notifications'
        bg={colors.brandRed}
        textColor={colors.brandWhite}
      />
      <MenuList bg={colors.brandGray}>
        {notifications ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              disabled={!notification.isSeen}
              bg={colors.brandGray}
            >
              <Box>
                <Box fontWeight='bold'>
                  {notification.type === NotificationType.INVITATION
                    ? 'Invitation'
                    : 'Notification'}
                </Box>
                <Box fontSize='sm'>{notification.message}</Box>
                {!notification.isSeen && (
                  <HStack>
                    {notification.type === NotificationType.INVITATION && (
                      <Button
                        colorScheme='green'
                        size='xs'
                        onClick={
                          notification.type === NotificationType.INVITATION
                            ? () =>
                                handleAccept(
                                  notification.clubId!,
                                  notification.userId,
                                  notification.id,
                                  notification.club!.name,
                                )
                            : () => {}
                        }
                      >
                        Accept
                      </Button>
                    )}
                    <Badge colorScheme='red' ml='1'>
                      New
                    </Badge>
                  </HStack>
                )}
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>No new notifications</MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default NotificationsDropdown
