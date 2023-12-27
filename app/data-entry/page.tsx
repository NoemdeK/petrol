
import {UploadClient} from '@/components/UploadClient'
import React from 'react'

const Datapage = () => {
  return (
    <div>
      <div>
      <h4 className='text-lh md:text-2xl  font-semibold'>Hello</h4>
      <p className='font-medium'>
        Welcome to the file upload page! To get started, please follow these instructions:
      </p>
      <ol className='list-decimal my-4'>
        <li>Click the "Choose File" button below to select the file you want to upload.</li>
        <li>Make sure your file meets the supported formats: image, PDF, DOC, DOCX.</li>
        <li>Keep in mind the maximum file size allowed is 5 MB.</li>
        <li>After selecting the file, click the "Upload" button to start the upload process.</li>
      </ol>
      </div>
      <UploadClient />
    </div>
  )
}

export default Datapage