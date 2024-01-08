"use client"
import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useDocumentView from '@/lib/useDocumentView'

export function DocumentView() {
    const { isOpen, onClose } = useDocumentView()

  return (
    <Sheet  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>View Document</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
        
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
