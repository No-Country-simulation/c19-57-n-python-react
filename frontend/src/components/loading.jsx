import { Spinner } from '@material-tailwind/react'

export function Loading({ height }) {
  return (
    <div
      className={`flex items-center justify-center ${
        height ? height : 'h-screen'
      }`}
    >
      <Spinner className='h-16 w-16 animate-spin text-pink-default' />
    </div> // Esto es un comentario
  )
}
