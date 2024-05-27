'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FaShoppingCart } from 'react-icons/fa'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center shadow-none text-foreground hover:text-primary border-none hover:bg-transparent m-0 p-0 px-2.5 rounded-full focus-visible:ring-primary"
          variant="outline"
          //   size="icon"
        >
          <FaShoppingCart size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-[1001]">
        <SheetHeader>
          <SheetTitle>Edit Cart</SheetTitle>
          <SheetDescription>
            Make changes to your cart here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
