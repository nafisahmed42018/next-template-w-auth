import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ImCross } from 'react-icons/im'
type PasswordTooltipProps = {
  message: string
}

const PasswordTooltip: React.FC<PasswordTooltipProps> = ({ message }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <ImCross size={12} className=" text-red-600" />
        </TooltipTrigger>
        <TooltipContent align="start">
          <p className=" max-w-[250px]">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default PasswordTooltip
