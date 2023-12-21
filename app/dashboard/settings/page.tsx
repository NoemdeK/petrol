import HeaderStat from '@/components/HeaderStat'
import { NotificationsForm } from '@/components/Notification'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Page = () => {
  return (
    // <NotificationsForm />
    <div className='space-y-4'>
        <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}

export default Page