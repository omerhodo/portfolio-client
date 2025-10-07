import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', padding: '2rem' }}
    >
      <h1>Call Me</h1>
      <a href="tel:+905453107187">+90 (545) 310-7187</a>
    </motion.div>
  );
};

export default Contact;
