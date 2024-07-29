import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

export default function AddTodos() {
  const [state, setState] = useState({ title: "", description: "", status: "incomplete", dateCreated: "", location: "" })
  const { authState } = useAuth()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()

    let { title, description, status, dateCreated, location } = state
    const id = Math.random().toString(36).slice(2);
    const newTodo = { title, description, status, dateCreated, location, id }

    let users = JSON.parse(localStorage.getItem("users")) || []

    const updatedUsers = users.map(user => {
      if (user.email === authState.user.email) {
        const updatedUser = {
          ...user,
          todos: user.todos ? [...user.todos, newTodo] : [newTodo]
        }
        authState.user = updatedUser
        localStorage.setItem("isAuthenticated", JSON.stringify('true'))
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return user
    })

    localStorage.setItem("users", JSON.stringify(updatedUsers))
    toast.success("Task Added Successfully", { position: "bottom-left" })
  }

  return (
    <>
      <main className='d-flex flex-column justify-content-center minvh-100'>
        <div className="container border border-dark rounded-2 " id='form'>
          <div className="row">
            <div className="col">
              <form className='mx-5 my-4' onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <h2>Add Todo</h2>
                    <p className='small'>Manage your work with Task Vault</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" placeholder='Title' className="form-control" name='title' id="title" onChange={handleChange} aria-describedby="emailHelp" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <textarea name="description" placeholder='Description' className='border rounded-2 ps-2' id="description" onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input type="date" className="form-control" name='dateCreated' id="dateCreated" onChange={handleChange} aria-describedby="emailHelp" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" placeholder='Location' className="form-control" name='location' id="location" onChange={handleChange} />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <button type="submit" className="btn btn-primary w-100">Add</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <Link to='/frontend/todos' className='fw-bold'>Check Todos</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
