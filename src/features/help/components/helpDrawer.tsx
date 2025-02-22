import Button from '@/components/Button'
import { useDrawerStore } from '../store'
import { AnimatePresence, motion } from 'motion/react'

export const HelpDrawer = () => {
  const { isOpen, close } = useDrawerStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 z-10 bg-black'
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className='bg-white absolute z-20 inset-0 rounded-t-3xl top-32 flex flex-col justify-between items-center py-8 px-4 md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:py-4'
          >
            <div className='flex flex-col items-center'>
              <span className='text-3xl font-bold'>SiteAdı</span>
              <span className='text-lg mt-12'>
                Hayaletler tahmini ring konumları işte onların üstüne basınca geçmişteki konumlarını falan öyle
              </span>
            </div>
            <Button className='h-14 w-full mb-4 md:mb-0 rounded-2xl' onClick={close}>
              Tamam
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
