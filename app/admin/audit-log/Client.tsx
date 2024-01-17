"use client"

import React from 'react'
import { AuditlogTable } from './AuditLogTable'

const Client = ({data}: any) => {
  return (
    <div>
        <div>
            <h4 className='font-bold text-xl'>
                Audit Log
            </h4>
            <AuditlogTable data={data} />
        </div>
    </div>
  )
}

export default Client