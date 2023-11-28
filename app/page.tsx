import Logo from '@/components/sections/Logo'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  gap-12 p-12 ">
      <div className="z-10 w-full items-center justify-between lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center text-xl md:text-5xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto   lg:p-4 ">
          dio<span className='font-bold'>phalytics</span><span className='text-black'>.io</span>
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto text-lg lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
        </div>
      </div>

     <div className='h-full flex items-center'>
      <div className='h-full flex flex-col gap-8 mt-16'>
          <h4 className='text-xl sm:text-3xl md:text-5xl lg:text-6xl leading-loose font-bold'>
            Solving the <span className='text-purple-800'>hardest</span> <br />
            data collection and <br />
            veification challenges
          </h4>
          <div className='flex items-center gap-4'>
            <p className='text-lg md:text-xl'>Check out our tools</p>
            <Link href={'/signin'} className='bg-white p-2 border rounded-md'>
              <Logo />
            </Link>
          </div>
        </div>
     </div>

    </main>
  )
}
