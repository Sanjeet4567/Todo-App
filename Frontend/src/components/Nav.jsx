import { useState ,useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { NavConsts } from "../constants"
import DarkModeContext from "./DarkModeContext"

import darkModeIcon from "../assets/darkModeIcon.svg"
import Hamburger from "../assets/Hamburger.jsx"
import todoIcon from "../assets/todoIcon.svg"

function Nav() {
  const navigate=useNavigate()
  const {isDarkMode,setIsDarkMode}=useContext(DarkModeContext)

  //store the click value of hamburger(menu) icon for small devices
  const [isClicked,setIsClicked]=useState(false)

  //save the value of dark mode to local storage
  useEffect(()=>{
    localStorage.setItem("dark",isDarkMode.toString())
  },[isDarkMode])

  return (
    <>
    <header className={`px-5 lg:px-16 py-5  z-20 fixed  w-full ${isDarkMode?"style-nav-dark":"style-nav-light"}  `}>
      <nav className="flex justify-between items-center max-w-[1440px] m-0 ">

            {/* Todo icon */}
            <a name="App logo" href="/" className="lg:px-10 flex flex-row items-center gap-4 lg:gap-8">
              <img 
                 
                  src={todoIcon} 
                  alt="App Icon"
                  height={45}
                  width={45} 
                  color="red"
              />
              <h1 className="text-lg lg:text-xl font-semibold ">ToDo App</h1>
            </a>
            
          
          
          {/* For Desktops */}
          <div className="flex flex-row items-center">
            <ul className="max-lg:hidden flex flex-row flex-1 justify-center items-center gap-14 max-xl:gap-5  box-border">

              {/* Populating navLinks */}
              {NavConsts.map((item,i)=>(
                <li 
                  key={i} 
                  className={` hover:bg-violet-500 hover:text-slate-50 mx-1 rounded-xl`}>
                    <a className="block  px-8 py-3  text-lg  leading-normal " href={item.link}>
                      {item.label}
                    </a>
                </li>
              ))}

              {/* Logout Button when logged in */}
              {localStorage && localStorage.token && 
              <li 
                key={10} 
                className={`px-8 py-3 mx-1 hover:bg-violet-500 hover:text-slate-50 rounded-xl`}>
                  <span 
                    className=" text-lg  leading-normal cursor-pointer" 
                    onClick={()=>{
                      localStorage.clear()
                      navigate("/",{replace:true})
                    }}>
                      Logout
                  </span>
              </li>}

            </ul>

            {/* DarkMode Icon */}
            <div 
            className={`p-2 rounded-full ${isDarkMode?"bg-purple-200":""} cursor-pointer`}
            onClick={()=>{
              setIsDarkMode(!isDarkMode)
              
            }} >
              <img 
                className="block"
                src={darkModeIcon}
                alt="darkMode"
                width={25}
                height={25}
                 />
                
            </div>

            {/* Hamburger Icon for mobile  devices */}
            <div className={`lg:hidden px-2 cursor-pointer rounded-md ${isClicked?"border-2 border-violet-500":""}`}
                 onClick={()=>{
                  setIsClicked(!isClicked)
                  }}>
                <Hamburger color={`${isDarkMode?"#eee":"#333"}`}/>
            </div>
          </div>  
      </nav>
    </header>

    {/* For Mobile Devices */}
    {isClicked && 
    <div className={`lg:hidden fixed right-0 top-[88.58px]  w-[200px] border-gray-500 border-2  h-screen z-10  py-5 ${isDarkMode?"style-nav-dark":"style-nav-light"} `}>
            {/* Populating the NavLinks */}
            <ul className=" placeholder:flex flex-col items-center py-10 h-full box-border">
              {NavConsts.map((item,i)=>(
                <li  
                  key={i} 
                  className={` my-2 text-center hover:bg-violet-500 hover:text-slate-50 rounded-xl mx-1`}>
                    <a 
                      className="py-2 block text-lg" 
                      href={item.link}>
                        {item.label}
                    </a>
                </li>
              ))}

              {/* Logout Button when logged in */}
              {localStorage && localStorage.token &&  
              <li 
                key={10} 
                className={`py-2 my-2 text-center hover:bg-violet-500 hover:text-slate-50 rounded-xl mx-1`}>
                  <span 
                    className="text-lg cursor-pointer" 
                    onClick={()=>{
                      localStorage.clear()
                      navigate("/",{replace:true})
                    }}>
                      Logout
                  </span>
              </li>}
            </ul>
          </div>}
    </>
    
  )
}

export default Nav