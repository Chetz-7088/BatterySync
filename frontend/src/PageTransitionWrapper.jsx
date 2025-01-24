import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageTransitionWrapper({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -100,
      }}
      transition={{
        duration: 2,
        ease: [0.25, 0.8, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
