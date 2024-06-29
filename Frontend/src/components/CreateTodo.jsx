import { useContext, useState } from "react"
import DarkModeContext from "./DarkModeContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const serverLink=`${import.meta.env.VITE_SERVER_URL+":"+import.meta.env.VITE_SERVER_PORT}`


function CreateTodo(props) {
  const navigate=useNavigate()
  const handleCreate=()=>{
    if(!value ||!deadline){
      
      props.showAlert("alert","Fill all the required Feilds")
      return
    }
    //handle create

    //setting creation time
    let creationDate=new Date()

    axios.post(`${serverLink}/apis/create`,{
      value,
      deadline,
      status,
      creationDate,
    },
    {
        headers:{
          Authorization:'Bearer ' +localStorage.getItem("token")
        }
    })
    .then((res)=>{
      console.log(res.data);
      props.showAlert("success",res.data.msg)
      //add the todo in data
      const modifiedTodo=[res.data.data,...props.todo]
      props.setTodo(modifiedTodo)

      //set the default values
      setValue("")
      setStatus("Pending")
      setDeadline("")
    })
    .catch((error)=>{
      if(!error.response){
        console.log(error.code,error.message);
        props.showAlert("error",error.message)
        return
      }
      if(error.response.status===403){
        //Unauthorized access
        props.showUnAuth(error.response.data.msg)
        navigate("/UnAuth",{replace:true})

      }else{
        props.showAlert("error",error.response.data.msg,4000)

      }
    })
  }
  const [value,setValue]=useState("")
  const [status,setStatus]=useState("Pending")
  const [deadline,setDeadline]=useState("")
  const {isDarkMode}=useContext(DarkModeContext)
  return (
    <div name="outer div" className={`w-full  shadow-xl ring-slate-50/20 ring-2  mt-2 lg:mt-6  p-4  rounded-md ${isDarkMode?"style-card-dark":"style-card-light"}`}>
      <h1 className="text-center text-xl lg:text-3xl p-2 lg:py-5">Add new ToDo</h1>
      <main  className="w-full xl:w-fit xl:space-x-16 flex flex-col lg:flex-row justify-center lg:justify-around  items-center">
          
          <div>
            {/* todo input box */}
            <textarea 
              value={value} 
              name="" 
              id="" 
              className={`p-1  outline-violet-500 border-pink-400 rounded-md resize-none ${isDarkMode?"style-input-dark":"style-input-light"}   shadow-md shadow-purple-500`} 
              cols={30}
              rows={3} 
              placeholder="Enter Todo" 
              onChange={(e)=>{setValue(e.target.value)}}></textarea>
          </div>

          <div className="py-3 grid grid-cols-2 gap-y-4">
            {/* todo details */}
              <label htmlFor="deadline">Deadline:</label>
              <input 
                name="deadline"
                className={`rounded-sm ${isDarkMode?"style-input-dark":"style-card-light"} px-2`}  
                type="datetime-local"
                value={deadline}
                onChange={(e)=>{setDeadline(e.target.value)}}
              />
              <label htmlFor="status">Status:</label>
              <select 
                name="status" 
                className={`rounded-sm ${isDarkMode?"style-input-dark":"style-card-light"} outline-none px-2`}
                value={status}
                onChange={(e)=>{setStatus(e.target.value)}}
              >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
              </select>

              {/* Todo create button */}
              <button 
              name="CreateButton"
              className={`col-span-2 rounded-sm bg-gradient-to-br from-violet-500 to-purple-900 hover:bg-gradient-to-bl text-slate-50`}
              onClick={handleCreate}
              >Create </button>
          </div>

      </main>
    </div>
  )
}

export default CreateTodo