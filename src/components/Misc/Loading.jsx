import React from 'react'
import Navbar from '../Navbar/Navbar'

const Loading = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1>Loading</h1>
        <p>Loading content, please wait...</p>
      </div>
    </>
  )
}

export default Loading
