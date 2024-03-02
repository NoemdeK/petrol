import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useDeleteReport from "@/lib/useDeleteReport";

export function DeleteReportModal({ onCancel, onSubmit }: any) {
  const { isOpen, onClose } = useDeleteReport();

  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent className="bg-white text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            This action cannot be undone. This will permanently delete this
            report
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} type="button" className="">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} type="submit" className="">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
