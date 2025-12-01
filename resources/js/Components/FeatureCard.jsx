import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="h-full"
        >
            <div className="card-futuristic flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm flex-1 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}
