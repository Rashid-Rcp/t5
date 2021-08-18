import React, { useState, createContext } from 'react'

export const ActiveTypeContext = createContext()

const ActiveTypeContextProvider = (props) => {
  const [active, setActive] = useState('votes')

  return (
    <ActiveTypeContext.Provider value={[active, setActive]}>
        {props.children}
    </ActiveTypeContext.Provider>
  )
}

export default ActiveTypeContextProvider