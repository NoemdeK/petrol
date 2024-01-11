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
  
  export function DeletUserModal({onCancel, onSubmit}: any) {
    const { isOpen, onClose} = useDelete()

    return (
      <AlertDialog  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>

        <AlertDialogContent className="bg-destructive text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This action cannot be undone. This will permanently approve this entry 
            </AlertDialogDescription>
           
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel} type="button" className="text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit} type="submit" className="text-white">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  