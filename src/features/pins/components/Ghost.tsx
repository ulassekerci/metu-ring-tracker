import { getBetterColor } from '@/lib/colors'

export const Ghost = ({ color, onClick }: { color: string; onClick?: () => void }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24' onClick={onClick}>
      <path
        fill={getBetterColor(color)}
        stroke='#ffffff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1'
        d='M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8'
      ></path>
      <path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 10h.01M15 10h.01'></path>
    </svg>
  )
}
