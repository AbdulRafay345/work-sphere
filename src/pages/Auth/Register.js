import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {
  const initialState = { name: "", email: "", password: "", user_id: Math.random().toString(36).slice(2) }
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    let { name, email, password, user_id } = state
    let formData = { name, email, password, user_id }

    if(!name || !email || !password)return toast.error("Please Fill All Inputs Correctly!",{position:"bottom-left"})

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.find(user => user.email === email)


    if (!userExists) {
      users.push(formData)
      localStorage.setItem("users", JSON.stringify(users))
      toast.success("User Registered Succesfully!", { position: "bottom-left" })
      navigate("/")
    } else {
      return toast.error('User Already Exists', { position: "bottom-left" })
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
                  <h2>Register</h2>
                  <p className='small'>to get started</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="registerName" className="form-label">Name</label>
                  <input type="text" className="form-control" name='name' id="registerName" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="registerEmail" className="form-label">Email address</label>
                  <input type="email" className="form-control" name='email' id="registerEmail" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="registerPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' onChange={handleChange} id="registerPassword" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <p className="small">Already have an Account? <Link to='/' style={{ color: "black" }}>Login</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
