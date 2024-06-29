
import { useState,useContext, useEffect } from "react"
import DarkModeContext from "../components/DarkModeContext"
import flowerPot from "../assets/flowerPot.jpeg"
import {useNavigate} from "react-router-dom"
import axios from "axios"

function Auth(props) {
  //state values
  const[isSignUp,setIsSignUp]=useState(false)
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {isDarkMode}=useContext(DarkModeContext)

  //server address
  const serverLink=import.meta.env.VITE_SERVER_URL+":"+import.meta.env.VITE_SERVER_PORT
  
  const navigate=useNavigate()
  //if existing token,redirect to welcome page
  useEffect(()=>{
    if(localStorage.getItem("token")){
       
      navigate("/Welcome")
    }
  },[])

  
  //handle login and signup
  const handleAuth=async ()=>{
    //handle signup
    if(isSignUp){
      if(!username || !email || !password){
        return props.showAlert("alert","Fill all the details")
      }
      try{
        //register the user
        const res=await axios.post(`${serverLink}/auth/signup`,{
          email,
          username,
          password
        })
        if(res.status===200){
          const data=res.data
          //set token & username in the localstorage
          localStorage.setItem("token",data.token)
          localStorage.setItem("user",username)
          //forward to welcome page
          navigate("/Welcome" ,{replace:true})
        }
      }catch(err){
        if(!err.response){
          console.log(err.code,err.message);
          props.showAlert("error",err.message)
          return
        }
        props.showAlert("error",err.response.data.msg)
        console.log(err.response.data.msg)
      }
    }else{
       //handle login
      if(!username || !password){
        return props.showAlert("alert","Fill all the details")
      }
      try{
        //login the user
        const res=await axios.post(`${serverLink}/auth/login`,{
          username,
          password
        })
        if(res.status===200){
          const data=res.data
          //set token and user in localstorage and forward to welcome page
          localStorage.setItem("token",data.token)
          localStorage.setItem("user",username)
          navigate("/Welcome",{replace:true})
        }
      }catch(err){
        if(!err.response){
          console.log(err.code,err.message);
          props.showAlert("error",err.message)
          return
        }
        props.showAlert("error",err.response.data.msg)
        console.log(err.response.data.msg)
      }
    }
  }

  return (
    <div name="wrapper div " 
      className={` w-full lg:max-w-1/2 h-screen lg:pt-[100px] flex items-center justify-center  `}>
        <div 
          name="login-div" 
          className={` p-2 lg:p-10 min-h-[50%] w-[95%] lg:w-auto lg:h-3/5 border-2 border-purple-900  rounded-md flex flex-row justify-center ${isDarkMode?"style-card-dark":"style-card-light"}  max-lg:bg-flower max-lg:bg-cover max-lg:bg-center `}>
            {/* Image div :hidden on small devices */}
            <div 
              name="image-div" 
              className=" max-lg:hidden">
                <img 
                  className="h-full "
                  src={flowerPot} 
                  alt="flowerpot" 
              
                />
            </div>

            {/* Contains the sign up/login form */}
            <div 
            className={`max-lg:w-[90%] flex flex-col items-center justify-center  max-lg:bg-slate-800 max-lg:text-slate-100 max-lg:bg-opacity-85 rounded-md`}
            
            >
              <form 
                name="signup-form" 
                className={` lg:px-10 rounded-md flex flex-col items-center justify-center max-sm:space-y-2 `}>
                  <h1 className={` hover:text-violet-500 text-center text-xl lg:text-3xl font-semibold pb-4`}>{isSignUp?"SignUp":"Login"}</h1>
                  <input 
                    id="email" 
                    name="email" 
                    placeholder="E-mail" 
                    type="email"
                    required={isSignUp}
                    className={`${isSignUp?"":"hidden"} autofill:shadow-[inset_0_0_0px_1000px_rgb(250,245,255)] outline-none focus:shadow-lg focus:shadow-violet-500/80  text-purple-900 p-2 mt-1 rounded-lg border-spacing-2 border-2 border-purple-900 bg-purple-50`} 
                    value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value)
                    }}
                  /><br/>

                  <input 
                    id="username" 
                    name="username" 
                    placeholder="Username" 
                    type="text"
                    required={true}
                    className={`autofill:shadow-[inset_0_0_0px_1000px_rgb(250,245,255)] outline-none  focus:shadow-lg focus:shadow-violet-500/80 bg-purple-50   text-purple-900 p-2 mt-1 rounded-lg border-spacing-2 border-2 border-purple-900 ring-1 ring-purple-900/5 `} 
                    value={username}
                    onChange={(e)=>{
                      setUserName(e.target.value)
                    }}

                  /><br/>

                  <input 
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    type="password"
                    required={true}
                    className={` outline-none  focus:shadow-lg focus:shadow-violet-500/80 bg-purple-50 ring-1 ring-purple-900/5  text-purple-900 p-2 mt-1 rounded-lg border-spacing-2 border-2 border-purple-900 `} 
                    value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }}

                  /><br/>

                  {/*button  login /Signup /Submit  */}
                  <button 
                    className={`px-4 p-2 mt-2 w-1/2  rounded-lg bg-gradient-to-br from-violet-400 to-purple-900 hover:bg-gradient-to-bl text-slate-50 font-semibold`} 
                    name="SubmitButton"
                    type="submit"
                    onClick={(e)=>{
                      e.preventDefault()
                      handleAuth()
                    }}
                  >{isSignUp?"SignUp":"Login"}</button>
                </form>
                 
                 {/* Switch to Login from Signup */}
                {isSignUp && <h1 
                  className="py-2 font-semibold ">Already have a account?
                  <button className="text-blue-500" 
                    onClick={(e)=>{
                      e.preventDefault()
                      setIsSignUp(false)
                  }}>Login
                  </button>
                </h1>}

                  {/* Switch to Login from Signup */}
                {!isSignUp && <h1 className="py-2 font-semibold ">New User?
                  <button className="text-blue-500" 
                    onClick={(e)=>{
                      e.preventDefault()

                      setIsSignUp(true)
                    }}>Create a Account
                  </button>
                </h1>}

            </div>  
        </div>
    </div>
  )
}

export default Auth