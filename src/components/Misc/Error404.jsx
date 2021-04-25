import React from 'react'
import Navbar from '../Navbar/Navbar'

const Error404 = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1>Error 404</h1>
        <p>Page not found</p>
      </div>
    </>
  )
}

export default Error404
