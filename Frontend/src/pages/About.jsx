import React, { useContext } from 'react'
import DarkModeContext from '../components/DarkModeContext'
function About() {
  const {isDarkMode}=useContext(DarkModeContext)
  return (
    <div className='py-[100px] h-screen grid place-items-center'>
      <div className={`${isDarkMode?"style-card-dark":"style-card-light"} h-min-fit w-11/12 rounded-md p-5`}>
        <h1 className='text-6xl font-semibold p-2'>About</h1>
        <p className='text-lg p-2 '>

          This Todo App is created to help people keep track of there work ,leading to better efficiency in maintaing there chores.
          <br/><br/><br />
          This app is created by <a  className="text-violet-500" href="https://www.linkedin.com/in/sanjeetraj40/">Sanjeet Raj</a><br/> <br />
          You can find the source code at : <a  className="text-violet-500" href="https://github.com/Sanjeet4567">https://github.com/Sanjeet4567</a>
        </p>
      </div>
    </div>
  )
}

export default About