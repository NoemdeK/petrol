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
import useVerify from "@/lib/useVerify"
  
  export function VerifyModal({onCancel, onSubmit}: any) {
    const { isOpen, onClose } = useVerify()

    return (
      <AlertDialog  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will verify this user.
              
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
  