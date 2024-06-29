import React, { useContext, useState } from 'react'
import DarkModeContext from './DarkModeContext'
import axios from "axios"
const serverLink=`${import.meta.env.VITE_SERVER_URL+":"+import.meta.env.VITE_SERVER_PORT}`

/** props:{
 * props.showAlert(type,msg,timeout=2500)
 * props.showUnAuthMessage(msg)
} */
function TodoCard(props) {
  //state values
  const{isDarkMode}=useContext(DarkModeContext)
  const [isEditing,setEditing]=useState(false)
  const [isDeleted,setDeleted]=useState(false)
  const [todo,setTodo]=useState(props.value)
  const [status,setStatus]=useState(props.status)
  const [deadline,setDeadline]=useState(props.deadline)

  //modify creation date into desired fomat
  let creationDate=new Date(props.creationDate).toISOString()
  creationDate=creationDate.substring(0,creationDate.lastIndexOf(":"))
  creationDate=creationDate.replace("T"," ")
  
  
  //Update function
  const updateTodo=()=>{
    if(!todo || !status || !deadline){
      return showAlert("alert","Fill all the feilds")
    }
    axios.post(`${serverLink}/apis/todo/${props.ID}`,{
      value:todo,
      status,
      deadline
    },
    
    {
        headers:{
          Authorization:'Bearer ' +localStorage.getItem("token")
        }
    })
    .then((res)=>{
      console.log(res.data.msg)
      props.showAlert("success","Todo Updated ")
      
    })
    .catch((error)=>{

      console.log(error.response.data.msg);
      if(error.response.status===403){   
        //UnAuthorized Access
        props.showUnAuthMessage(error.response.data.msg)
        navigate("/UnAuth",{replace:true})

      }else{
        //server error
        props.showAlert("error",error.response.data.msg,4000) 
      }
    })
  }

  //Delete function
  const deleteTodo=()=>{
    axios.delete(`${serverLink}/apis/todo/${props.ID}`,
      {
          headers:{
            Authorization:'Bearer ' +localStorage.getItem("token")
          }
      })
    .then((res)=>{
      props.showAlert("success","Todo Deleted")
      console.log(res.data.msg)
      setDeleted(true)
    })
    .catch((error)=>{
      console.log(error.response.data.msg);
      if(error.response.status===403){   
        //UnAuthorized Access
        props.showUnAuthMessage(error.response.data.msg)
        navigate("/UnAuth",{replace:true})

      }else{
        //server error
        props.showAlert("error",error.response.data.msg,4000) 
      }
    })
  }
  return (
     
    !isDeleted && 
    <main 
      name="Wrapper div" 
      className='flex flex-col max-xl:gap-2 xl:grid xl:grid-cols-5 xl:justify-items-center xl:items-center pt-6 pb-4 xl:py-7 my-3 border-b-2 border-purple-600 '>
        {/* headers */}
        <h1 className='max-xl:hidden'>Todo</h1>
        <h1 className='max-xl:hidden'>Status</h1>
        <h1 className='max-xl:hidden'>Creation Time</h1>
        <h1 className='max-xl:hidden'>Deadline</h1>
        {/* <h1 className='max-xl:hidden'>Options</h1> */}

        {/* Todo */}
        <textarea 
          className={`bg-slate-50 text-slate-950  resize-none rounded-md p-1 outline-violet-500`} 
          name="TodoText" 
          id="" 
          disabled={!isEditing} 
          value={todo} 
          onChange={(e)=>{setTodo(e.target.value)}}
        ></textarea>

        <div> 
          <label 
            className="xl:hidden" 
            htmlFor="status">Status:</label>
          <select 
            className={`p-1 rounded-md  ${!isEditing ?"appearance-none":""} bg-slate-50 text-slate-950 `}
            name="status" 
            id="" 
            disabled={!isEditing} 
            value={status} 
            onChange={(e)=>{
             setStatus(e.target.value)
          }}>
            <option value="Pending" >Pending</option>
            <option value="Completed" >Completed</option>
            <option value="Delayed"  >Delayed</option>
          </select>
        </div>

        <div>
          <label className='xl:hidden' >Created:</label>
          <span className={`bg-slate-50 text-slate-950 `}>{creationDate}</span>
        </div>

        <div name="for deadline">
          <label htmlFor="deadline" className='xl:hidden'>Deadline:</label>
          <input 
            className={`p-1 rounded-md bg-slate-50 text-slate-950  outline-violet-500 xl:w-[170px]`}
            name="deadline" 
            type="datetime-local" 
            value={deadline} 
            onChange={(e)=>{
              setDeadline(e.target.value)
            }} disabled={!isEditing}/>
        </div>
      
        <section 
          name="Functionallity" 
          className='xl:col-start-5 xl:row-start-1 xl:row-span-2 w-full flex flex-row justify-between xl:justify-around'>
          <div>
            {/* Edit button */}
            <button 
              className={`bg-violet-500 text-slate-50 px-6 py-2 rounded-md`}
              onClick={()=>{
              if(isEditing){
                setEditing(false)
                //save in db
                updateTodo()
                
              }else{
                //set Editing to true
                setEditing(true)
              }
            }}>{`${isEditing?"Save":"Edit"}`}</button>
          </div>

          <div>
            {/* delete */}
            <button 
              className={`bg-red-500 text-slate-50 px-4 py-2 rounded-md`}
              onClick={()=>{
              //handle the delete from database 
              //hide the current todo
              deleteTodo()
            }}>Delete</button>
          </div>

        </section> 
    </main>
  )
}

export default TodoCard