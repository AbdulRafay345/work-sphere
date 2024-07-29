import React from 'react'

export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <footer className='bg-body-tertiary'>
      <div className="container">
        <div className="row">
          <div className="col py-1 text-center">
            <p>&copy; {year}. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
