import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, ...props }) {
    return (
        <motion.div
            className={`card-futuristic ${className}`}
            whileHover={hover ? { y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' } : {}}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
