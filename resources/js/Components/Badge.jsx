import { motion } from 'framer-motion';

export default function Badge({ type = 'bronze', children, className = '' }) {
    const colors = {
        bronze: 'bg-amber-100 text-amber-800 border-amber-300',
        silver: 'bg-gray-100 text-gray-800 border-gray-300',
        gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        platinum: 'bg-purple-100 text-purple-800 border-purple-300',
    };

    return (
        <motion.span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[type]} ${className}`}
            whileHover={{ scale: 1.05 }}
        >
            {children}
        </motion.span>
    );
}
