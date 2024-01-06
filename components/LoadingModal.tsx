"use client"
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialogload"
import useLoading from "@/lib/useLoading"
  
  
  export default function LoadingModal() {
      const { isOpen, onClose } = useLoading()
    return (
      <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-transparent border-none sm:max-w-[425px] shadow-none flex justify-center">
      < div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </DialogContent>
    </Dialog>
    )
  }
  
  
  
  