import React from 'react'
import { Link } from 'react-router-dom';

export default function Users() {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const generateTableRows = () => {
    return users.map((user, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.user_id}</td>
      </tr>
    ))
  }

  const table = (
    <div className="table-responsive">
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">User Id</th>
          </tr>
        </thead>
        <tbody>
          {generateTableRows()}
        </tbody>
      </table>
    </div>
  )


  return (
    <main>
      <div className="container text-center">

        <div className="row">
          <div className="col">
            <h1 className='text-white mt-3'>Users</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {table}
          </div>
        </div>
      <div className="row">
        <div className="col">
          <Link to='/frontend/home' className='btn btn-outline-light'>Go To Home</Link>
        </div>
      </div>

      </div>
    </main>
  )
}
