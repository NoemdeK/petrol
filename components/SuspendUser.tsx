import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
   } from "@/components/ui/alert-dialog"

import useDelete from "@/lib/useDelete"
import useSuspend from "@/lib/useSuspend"
  
  export function SupsendUserModal({onCancel, onSubmit}: any) {
    const { isOpen, onClose} = useSuspend()

    return (
      <AlertDialog  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Suspension</AlertDialogTitle>
          <AlertDialogDescription>
          Are you absolutely sure you want to suspend user?            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} type="submit" className="text-white">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
  }
  