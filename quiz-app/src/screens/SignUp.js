import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate=useNavigate()
  const [credentials, setcredentials] = useState({
    name: "",
    gmail: "",
    password: ""
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch('http://localhost:5000/api/userhandle',{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name: credentials.name,
          gmail: credentials.gmail,
          password: credentials.password
  
        })
      })
      

    const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert(json.errors[0].msg);
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');    
      }
      navigate('/login')
      

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      
    }


  }

  const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})

  }
  return (
    <div className='bg-image'>
      <div className='container' >
          <form className='w-50 mx-auto mt-5 border bg-black border-whites rounded' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='gmail' value={credentials.gmail} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="btn btn-primary m-3 mx-1">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
        </div>
    </div>
  )
}

export default SignUp
