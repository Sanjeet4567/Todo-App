
import { useContext } from "react"
import DarkModeContext from "../components/DarkModeContext"


function Home() {
  const {isDarkMode}=useContext(DarkModeContext)

  return (
    <div name="outer-div" className={`h-screen px-2 pt-[95px] lg:pt-[100px]  ${isDarkMode?"style-card-dark":"style-card-light"}`}>
      
      <header >
        <h1 
          className=" pb-7 lg:py-10 lg:text-center font-mono  text-4xl lg:text-6xl ">
            Keep 
            <span className="text-violet-500 font-extrabold">Track</span><br/>
            Of  
            <span className="text-violet-500 font-bold">Your Work</span>
        </h1>
      </header>

      <section>
        <p 
          className="text-lg p-2 text-center mb-2">
            Our 
            <span className="text-violet-500 font-medium font-sans">Todo App</span>
            brings the power of manganing your tasks effectively .So that you can focus on finishing them and leave there management to us.
        </p>
      </section>

      <section className={`bg-todo bg-cover bg-center  rounded-2xl shadow-xl  lg:w-1/2 m-auto h-1/2 grid place-items-center lg:mt-4`}>
        <div className={`h-48 lg:h-3/4 py-8  w-9/10 lg:w-3/4  flex flex-col justify-between items-center bg-slate-200 bg-opacity-80 rounded-2xl p-2`}>
          <h1 className="text-3xl lg:text-5xl text-slate-900 ">Start Creating Todos</h1>
          <div className="w-full flex flex-row justify-around">
            <a type="button" href="/Auth" className="text-white bg-gradient-to-br from-violet-500 to-purple-800 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign-up/Login</a>
          </div>
        </div>
      </section>
    
    </div>
    
  )
}

export default Home