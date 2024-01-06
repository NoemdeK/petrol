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
import useApprove from "@/lib/useApprove"
  
  export function ApproveModal({onCancel, onSubmit}: any) {
    const { isOpen, onClose } = useApprove()

    return (
      <AlertDialog  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently approve this entry 
              
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
  