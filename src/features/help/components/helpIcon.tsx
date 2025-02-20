import { CircleHelpIcon } from 'lucide-react'
import { useDrawerStore } from '../store'

export const HelpIcon = () => {
  const { open } = useDrawerStore()

  return (
    <div className='absolute right-2 top-4 rounded-md bg-white bg-opacity-90 h-9 w-9 drop-shadow-xl grid place-content-center'>
      <CircleHelpIcon className='w-6 h-6 opacity-90' onClick={open} />
    </div>
  )
}
