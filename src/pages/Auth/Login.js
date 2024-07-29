import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function Login() {
  const [state, setState] = useState({ email: "", password: "" })
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    let {email,password} = state
    if(!email || !password) return toast.error("Please Fill All Inputs Correctly",{position:'bottom-left'})

  const isLoggedIn =   login(email, password)
  if(isLoggedIn){
    toast.success("User logged in",{position:'bottom-left'})
    navigate("/frontend/home")
  }  
  }

  return (
    <>
      <div className="container border border-dark rounded-2" id='form'>
        <div className="row">
          <div className="col">
            <form className='m-5' onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <h2>Login</h2>
                  <p className='small'>Welcome Back!</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="loginEmail" className="form-label">Email address</label>
                  <input type="email" className="form-control" name='email' id="loginEmail" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col d-flex flex-column" style={{ position: "relative" }}>
                  <Link to='/forgot-password' style={{ position: "absolute", right: "0", textDecoration: "none" }}>Forgot Password</Link>
                  <label htmlFor="loginPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' id="loginPassword" onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <p className="small">Don't have an Account? <Link to='/register' style={{ color: "black" }}>Register</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
