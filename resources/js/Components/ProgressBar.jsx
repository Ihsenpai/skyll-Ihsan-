import { motion } from 'framer-motion';

export default function ProgressBar({ value, max = 100, className = '' }) {
    const percentage = (value / max) * 100;

    return (
        <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
            <motion.div
                className="bg-primary-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </div>
    );
}
