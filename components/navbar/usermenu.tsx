'use client'
import React from 'react'
import { LogOut, Mail, MessageSquare, Settings, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaImage, FaRegImages, FaUserCircle } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import {
  MdEvent,
  MdHelpOutline,
  MdMonochromePhotos,
  MdOutlineSell,
} from 'react-icons/md'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import UserMenuItem from './usermenu-item'
import { useCurrentUser } from '@/hooks/use-current-user'

const UserMenu = () => {
  const user = useCurrentUser()

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className=" bg-background text-foreground rounded-full hover:text-background hover:bg-primary hover:shadow-md hover:shadow-primary/30 focus-visible:ring-primary"
            size={'icon'}
          >
            <FaUserCircle size={40} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 z-[1001]"
          // @ts-ignore
          sideOffset="2"
        >
          {user && (
            <>
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex items-center gap-2">
                  <MdOutlineSell className="h-4 w-4" />
                  <span>Sell</span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="z-[1010]">
                  <DropdownMenuItem>
                    <FaImage className="mr-2 h-4 w-4" />
                    <span className="leading-3">Painting</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MdMonochromePhotos className="mr-2 h-4 w-4" />
                    <span className="leading-3">Photograph</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex items-center gap-2">
                  <FiPlusCircle className="h-4 w-4" />
                  <span>Create</span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="z-[1010]">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <MdEvent className="h-4 w-4" />
                    <span>Event</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <FaRegImages className="h-4 w-4" />
                    <span>Exhibtion</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2">
              <MdHelpOutline className=" h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <UserMenuItem label="Settings" redirect="/settings" shortcut="⌘S">
              <Settings className="h-4 w-4" />
            </UserMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
