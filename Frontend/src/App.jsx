import { useState} from 'react'
import { Route,Routes } from 'react-router-dom'
import {Home,About,Auth,Welcome,ContactUs,UnAuth} from "./pages/index.jsx"
import {Alert,Nav,DarkModeContext} from './components/index.jsx'

function App() {
  //set the stored value of dark mode if any
  let darkMode=false
  if(localStorage.getItem("dark")){
    darkMode=JSON.parse(localStorage.getItem("dark"))
  }

  // state values
  const [UnAuthMessage,setUnAuthMessage]=useState("")
  const [alert,setAlert]=useState(null)
  const [isDarkMode,setDarkMode]=useState(darkMode)

  //handler functions to pass as props
  const showUnAuthMessage=(msg)=>{
    setUnAuthMessage(msg)
  }

  const setIsDarkMode=(mode)=>{
    setDarkMode(mode)
  }
  
  const showAlert=(type,text,timeout=2500)=>{
      setAlert({
        type,
        text
      })
      setTimeout(() => {
        setAlert(null)
      }, timeout);
    }

  return (
    <>
    <DarkModeContext.Provider value={{isDarkMode,setIsDarkMode}}>

      <header>
        <Nav/>
        <div className='flex  justify-center w-full'>
        <Alert alert={alert}/>
        </div>
      </header>

      <main className={` px-4   lg:px-20 ${isDarkMode?"style-body-dark":"style-body-light"}`}>
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/Auth' element={<Auth showAlert={showAlert} showUnAuthMessage={showUnAuthMessage} />}/>
          <Route path='/Welcome' element={<Welcome showAlert={showAlert} showUnAuthMessage={showUnAuthMessage}/>}/>
          <Route path='/UnAuth' element={<UnAuth text={UnAuthMessage}/>}/>

        </Routes>
      </main>
  
    </DarkModeContext.Provider>
    </>
  )
}

export default App
