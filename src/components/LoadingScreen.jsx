import { motion } from 'framer-motion'

export default function LoadingScreen({ leaving = false }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-300 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <motion.div
        className="loading-brand-stack"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="brand-name-lg text-center whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.32 }}
        >
          M Bilal Waleed
        </motion.h1>

        <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          />
        </div>
      </motion.div>
    </div>
  )
}
