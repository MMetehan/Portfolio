import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt } from 'react-icons/fa';

export const LightningBolt = ({ delay = 0, className = "" }) => {
    return (
        <motion.div
            className={`absolute text-cyan-400 pointer-events-none ${className}`}
            style={{ '--delay': `${delay}s` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <FaBolt className="lightning-bolt text-4xl" />
        </motion.div>
    );
};

export const FloatingSparks = () => {
    const sparks = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {sparks.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute"
                    style={{
                        left: `${spark.left}%`,
                        top: `${spark.top}%`,
                        '--delay': `${spark.delay}s`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: spark.delay }}
                >
                    <div
                        className="spark-float text-cyan-400"
                        style={{ fontSize: `${spark.size}px` }}
                    >
                        ⚡
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
