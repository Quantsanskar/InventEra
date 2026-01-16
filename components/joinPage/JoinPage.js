import React from 'react'
import { ArrowLeft } from 'lucide-react'

function JoinPage() {
  return (
    <div className='w-full h-screen flex lg:flex-row flex-col-reverse bg-black lg:items-center gap-14 overflow-hidden'>
      <div className='w-full lg:w-2/5 bg-black flex-1 lg:flex-none lg:h-screen'>
        <div className='flex lg:flex-col items-left justify-center lg:justify-between h-full'>
            <div className="hidden lg:flex items-center gap-3 ml-4 mt-4">
                <button 
                  onClick={() => window.location.href = "/"} 
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Go back to home"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                
            </div>
            <div className='h-fit text-white pb-12 px-6 lg:pl-11 flex flex-col items-start justify-center gap-5'>
                <h1 className='font-manrope font-bold text-4xl md:text-7xl'>hi. we are <br></br> Builder's Space.</h1>
                <h2 className='font-manrope opacity-50 text-lg md:text-2xl'>Welcome to Builder's Space-where <br></br> creativity meets chaos! <br></br> Build Cool Stuff. With Cooler People.</h2>
                <button className='bg-white w-full md:w-2/5 h-14 text-2xl text-black font-caveat font-bold hover:opacity-70 transition-all ease-linear hover:text-3xl' onClick={() => window.open("https://www.commudle.com/communities/builders-space/events/found-d", "_blank")}>FOUND'D</button>
            </div>
        </div>
      </div>
      <div className='w-full lg:w-3/5 bg-video-bs bg-center bg-cover bg-no-repeat flex-1 lg:flex-none lg:h-screen relative lg:border-l border-gray-600'>
        <div className='absolute inset-0 bg-black/30 '>
        <div className="flex  items-center justify-between gap-3 ml-4 mt-4 mr-4">
                <button 
                  onClick={() => window.location.href = "/"} 
                  className="text-white hover:opacity-70 transition-opacity lg:hidden block"
                  aria-label="Go back to home"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="bg-buildersspace-logo bg-center bg-cover bg-no-repeat h-10 w-10" onClick={() => window.location.href = "/"}>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default JoinPage
