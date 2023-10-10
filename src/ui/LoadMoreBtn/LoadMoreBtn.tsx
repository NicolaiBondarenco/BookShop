import React from 'react'

interface IProp {
  onClick: () => void
  status: string
}

export const LoadMoreBtn: React.FC<IProp> = ({ status, onClick }) => {
  return (
    <button onClick={onClick}>
      {status === 'loading' ? 'Loading...' : 'Load more...'}
    </button>
  )
}
