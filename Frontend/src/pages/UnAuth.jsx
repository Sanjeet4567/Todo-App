import React from 'react'
import { useNavigate } from 'react-router-dom'


function UnAuth(props) {
    const navigate=useNavigate()
   
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex flex-col gap-7'>
            
            <h1 className='font-extrabold text-2xl lg:text-5xl'>{props.text?props.text:"Unauthorized Forbidden"}</h1>
            <div className='w-full flex justify-center'>
                <button className='bg-violet-600 text-slate-50 px-4 py-2 m-2 rounded-lg'
                onClick={()=>{
                    localStorage.clear()
                    navigate("/Auth",{replace:true})
                }}
                > Return to Login  Page</button>
            </div>
            
        </div>
    </div>
  )
}

export default UnAuth