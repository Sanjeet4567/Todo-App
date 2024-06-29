import {useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import TodoCard from "../components/TodoCard"
import CreateTodo from "../components/CreateTodo"
import DarkModeContext from "../components/DarkModeContext"

const serverLink=`${import.meta.env.VITE_SERVER_URL+":"+import.meta.env.VITE_SERVER_PORT}`

function Welcome(props) {
  const navigate=useNavigate()

  // State values
  const {isDarkMode}=useContext(DarkModeContext)
  const [todo,setTodo]=useState(null)
  const toSetTodo=(val)=>{setTodo(val)}

  
  useEffect(()=>{
    (async()=>{
      try{
        //fetch todos
        const response=await axios.get(`${serverLink}/apis/todos`,{
          headers:{
            Authorization:'Bearer ' +localStorage.getItem("token")
          }})
        setTodo(response.data)
      }catch(error){

        if(error.response.status===403){
          //UnAuthorized Access
          props.showUnAuthMessage(error.response.data.msg)
          navigate("/UnAuth",{replace:true})

        }else{
          //server error
          props.showAlert(error.response.data.msg)
        }
        props.showUnAuthMessage(error.response.data.msg,4000)        
      }

    })()
  },[])
  
  
  return (
    <div 
      className={`min-h-screen xl:w-fit pt-[90px] lg:pt-[100px] flex flex-col items-center justify-center m-auto `}>
        <h1 className="text-xl lg:text-3xl ">Welcome {localStorage.getItem("user")}</h1>
        <CreateTodo 
          todo={todo} 
          setTodo={toSetTodo} 
          showAlert={props.showAlert} 
          showUnAuthMessage={props.showUnAuthMessage}/>
        
        <div className={`flex flex-col items-center py-5 ${isDarkMode?"style-card-dark":"style-card-light"} w-full px-2 rounded-md my-3 `}>

          <h1 className="text-xl lg:text-2xl font-bold">Your todos</h1> 
          {/* Populate Todos */}
          {todo && todo.map((item)=>(
            <TodoCard 
              key={item._id} 
              value={item.todo.val} 
              status={item.todo.status} 
              creationDate={item.todo.creationDate} 
              deadline={item.todo.deadline} 
              ID={item._id} showAlert={props.showAlert} 
              showUnAuthMessage={props.showUnAuthMessage}/>

          ))}
          {!todo && <h1 className="text-lg text-center ">Start by creating a todo</h1>}
        </div>
    </div>
  )
}

export default Welcome