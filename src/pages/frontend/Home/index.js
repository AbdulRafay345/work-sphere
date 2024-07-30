import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Home() {
  let { authState } = useAuth()

  const [numberUsers, setNumberUsers] = useState(0)
  const [numberTodos, setNumberTodos] = useState(0)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    setNumberUsers(users.length)
  }, [])
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    let user = users.find(user => user.email === authState.user.email)
    if (user && user.todos) {
      setNumberTodos(user.todos.length)
    } else {
      setNumberTodos(0)
    }
  }, [authState])

  return (
    <main className='d-flex flex-column justify-content-center aling-items-center'>
      <h1 className='text-white text-center my-3'>Welcome To Work Sphere</h1>

      <div className="container mt-2">
        <div className="row text-center">
          <div className="col mb-2">
            <div className="card pt-5 fs-3 fw-bold">
              Users
              <div className="row">
                <div className="col">
                  <div className='fs-5 mb-3'>Number of Users: {numberUsers}</div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Link to='/frontend/users' className='btn btn-primary'>Check Users</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className="card pt-5 fs-3 fw-bold">
              Todos
              <div className="row">
                <div className="col">
                  <div className="fs-5 mb-3">Number Of Todos: {numberTodos} </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Link to='/frontend/todos' className='btn btn-primary'>Check Todos</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}