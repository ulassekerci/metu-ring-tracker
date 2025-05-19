import Button from '@/components/Button'
import { useDrawerStore } from '../store'
import { AnimatePresence, motion } from 'motion/react'
import { Ghost } from '@/features/pins/components/Ghost'

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
            className='bg-white absolute z-20 inset-0 rounded-t-3xl top-32 flex flex-col justify-between items-center py-8 px-4 md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl md:py-4 md:w-[550px] md:h-[420px]'
          >
            <div className='flex flex-col items-center'>
              <span className='text-3xl font-bold'>Ring Nerede</span>
              <div className='mt-12 flex gap-5 items-center'>
                <img className='w-8 h-8' src='ring-red.png' />
                <span>Otobüs simgesiyle gösterilen araçlar gerçek zamanlı konum bilgisine sahip.</span>
              </div>
              <div className='mt-6 flex gap-5 items-center'>
                <Ghost color='#fb2c36' className='min-w-8 h-8' />
                <span>
                  Hayalet ringler geçmiş günlerde aynı saatte alınan verileri kullanarak tahmini konumu gösteriyor.
                </span>
              </div>
              <div className='mt-6 flex gap-5 items-center relative'>
                <div className='min-w-8 h-8' />
                <Ghost color='#fb2c36' className='absolute left-0 top-5 md:top-0 w-5 h-5' />
                <Ghost color='#fb2c36' className='absolute left-4 top-10 md:top-5 w-5 h-5 bg-white' />
                <Ghost color='#fb2c36' className='absolute -left-1 top-14 md:top-9 w-5 h-5 bg-white' />
                <span>
                  Hayaletlerin üstüne basarak geçmiş günlerde aynı saatte kaydedilmiş tüm konumlarını görebilirsiniz.
                </span>
              </div>
            </div>
            <Button className='h-14 w-full mb-0 rounded-2xl' onClick={close}>
              Tamam
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
