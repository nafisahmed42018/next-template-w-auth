import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] w-full mx-auto px-8 md:px-12 xl:px-20 fhd:px-32 ">
      {children}
    </div>
  )
}

export default Container
