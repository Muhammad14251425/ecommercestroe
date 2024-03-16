import React from 'react'

const Heading = ({heading,className}:{heading?:string; className?:string}) => {
  return (
    <h1 className={`text-3xl font-semibold pb-6 ${className}`}>{heading}</h1>
  )
}

export default Heading