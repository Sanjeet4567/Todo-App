import React from 'react'
import AlertTriangle from '../assets/AlertTriangle'
function Alert(props) {
    const type=props.alert?props.alert.type:null
    
    
    const alertTypes={
        "success":{
            text:" Success !! ",
            style:"bg-green-200 text-green-600 ",
            svgColor:"rgb(22 163 74)"
            
        },
        "error":{
            text:" Error!! ",
            style:"bg-red-300 text-red-600",
            svgColor:"rgb(220 38 38)"
        },
        "alert":{
            text:" Alert!! ",
            style:"bg-orange-200 text-orange-600",
            svgColor:"rgb(234 ,88, 12)"
        }

    }
    
  return (
    
    <div  className='fixed top-[90px] lg:top-[100px] w-[99%] m-auto h-[32px] lg:h-[35px]'>
        {props.alert && 
        <div className={`${alertTypes[type].style} border-2 border-white pl-4 w-full flex flex-row gap-x-4 lg:justify-center`}>
            <AlertTriangle color={alertTypes[type].svgColor}/>
            <p className='font-semibold text-lg lg:text-xl lg:px-2'>{alertTypes[type].text+"  "+props.alert.text}</p>
        </div>}
    </div>
  )
}

export default Alert