import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Shield } from 'lucide-react'
import { Layout } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadPdf from './UploadPdf'

const SideBar = () => {
  return (
    <div className='shadow-lg h-screen p-7'>
      <Image src={'/logo.svg'} alt='logo' width={200} height={200} />
      <div className='mt-10'>
        <UploadPdf>
          <Button  className='w-full'  >
            + Subir PDF
          </Button>
        </UploadPdf>
        <div className='flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer' >
          <Layout />
          <h2>
            Zona de trabajo
          </h2>
        </div>
        <div className='flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer' >
          <Shield />
          <h2>
            Premium
          </h2>
        </div>
      </div>
      <div className='absolute bottom-24 w-[80%]'>
        <Progress value={33} />
        <p className='text-sm mt-1'>2 de 5 Pdf subidos </p>
        <p className='text-xs text-gray-400 mt-2'>Premium para subir mas PDF </p>
      </div>
    </div>
  )
}

export default SideBar