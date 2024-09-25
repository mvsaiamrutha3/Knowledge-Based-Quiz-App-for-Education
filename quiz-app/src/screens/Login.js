import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()
  const [credentials, setcredentials] = useState({
    gmail: "",
    password: ""
  });
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let response=await fetch('http://localhost:5000/api/userlogin',{
      method:'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gmail: credentials.gmail,
        password: credentials.password
    })
    })
    const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
        if(json.success){
          localStorage.setItem("authToken",json.authToken)
          localStorage.setItem("userEmail",credentials.gmail)
          console.log(localStorage.getItem("authToken"))
          navigate("../home")
        }

  }
  return (
    <div className='bg-image'>
      <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-black border-white rounded' onSubmit={handleSubmit} >
            <h1>Login</h1>
            <div className="m-3">
              <label htmlFor="gmail" className="form-label">Email address</label>
              <input type="email" className="form-control" name='gmail' value={credentials.gmail} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to="/signup" className="m-3 mx-1 btn btn-danger">I'm a new user</Link>
          </form>
        </div>
    </div>
  )
}

export default Login
