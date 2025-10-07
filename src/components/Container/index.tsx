import { motion } from 'framer-motion';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen px-2 md:p-24 flex justify-center items-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Container;
