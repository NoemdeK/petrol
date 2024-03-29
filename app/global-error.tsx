'use client'

import ErrorComponent from "@/components/ErrorComponent"

 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex h-full w-full justify-center">
        <ErrorComponent />
      </body>
    </html>
  )
}