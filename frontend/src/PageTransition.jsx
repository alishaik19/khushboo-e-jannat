import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -12,
        scale: 1.01,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1], // smoother “easeOutQuint” type feel
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
