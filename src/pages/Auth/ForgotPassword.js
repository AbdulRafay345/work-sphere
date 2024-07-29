import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {

  const [state, setState] = useState({ email: "", newPassword: "", confirmPassword: "" })

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    let { email, newPassword, confirmPassword } = state
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (!email || !newPassword || !confirmPassword) return toast.error("Please Fill All Inputs Correctly", { position: "bottom-left" })
    if (newPassword !== confirmPassword) return toast.error("Passwords Didn't Match", { position: "bottom-left" })

    let userExists = users.find(user => user.email === email)

    if (!userExists) { return toast.error("User Not Found", { position: "bottom-left" }) }

    users = users.map(user => user.email === email ? { ...user, password: newPassword } : user)
    localStorage.setItem("users", JSON.stringify(users))
    toast.success("Password Updated", { position: "bottom-left" })
    navigate("/")
  }

  return (
    <>
      <div className="container border border-dark rounded-2" id='form'>
        <div className="row">
          <div className="col">
            <form className='m-5' onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <h2>Forgot Password</h2>
                  <p className='small'>Enter Email & Pasword</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="registerEmail" className="form-label">Email Address</label>
                  <input type="email" className="form-control" name='email' id="forgotPasswordEmail" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input type="password" className="form-control" name='newPassword' id="newPassword" onChange={handleChange} aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name='confirmPassword' onChange={handleChange} id="confirmPassword" />
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