import React from 'react'

const Emptystate = () => {
  return (
    <div>
        <img src="/empty-state.svg" alt="No Projects" className="w-48 h-48 mb-4" />
        <h2 className="text-xl font-semibold text-gray-500">No Projects Found</h2>
        <p className="text-gray-400">Create a new project to get started</p>
    </div>
  )
}

export default Emptystate