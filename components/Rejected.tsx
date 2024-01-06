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
import useReject from "@/lib/useReject"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
  
  export function RejectedModal({onCancel, onSubmit}: any) {
    const { isOpen, onClose, setData, data } = useReject()

    return (
      <AlertDialog  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>

        <AlertDialogContent className="bg-destructive text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This action cannot be undone. This will permanently approve this entry 
            </AlertDialogDescription>
            <div>
              <Label className="mb-4">
                Reason for rejecting
              </Label>
              <Textarea className="text-black" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel} type="button" className="text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit} type="submit" className="text-white">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  