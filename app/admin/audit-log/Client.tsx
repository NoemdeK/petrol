"use client"

import React from 'react'
import { AuditlogTable } from './AuditLogTable'

const Client = ({data, selectData}: any) => {
  return (
    <div>
        <div>
            <h4 className='font-bold text-xl mt-8'>
                Audit Log
            </h4>
            <AuditlogTable data={data} selectData={selectData} />
        </div>
    </div>
  )
}

export default Client