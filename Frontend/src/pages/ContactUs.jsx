import { useContext } from "react"
import DarkModeContext from "../components/DarkModeContext"


function ContactUs() {
  const {isDarkMode}=useContext(DarkModeContext)
  return (
    <div className='py-[100px] h-screen grid place-items-center w-11/12'>
      <div className={`${isDarkMode?"style-card-dark":"style-card-light"} h-4/5  rounded-md p-5 text-pretty overflow-clip w-full`}>
        <h1 className='text-5xl md:text-6xl font-semibold'>Contact Us</h1>
        <p className='max-sm:text-lg text-xl p-2 '>
          <span className="font-bold ">Created by:</span> <span  >Sanjeet Raj</span><br/>
          <span className="font-bold ">LinkedIn:</span> <a  className="text-violet-500" href="https://www.linkedin.com/in/sanjeetraj40/">Sanjeet Raj</a><br/>
          <span className="font-bold ">Github ID:</span><a  className="text-violet-500" href="https://github.com/Sanjeet4567">https://github.com/Sanjeet4567</a><br/>
          <span className="font-bold ">Email:</span><span  className="text-violet-500" >sanjeetraj0440@gmail.com</span>
          <br/>
        </p>
      </div>
    </div>
  )
}

export default ContactUs