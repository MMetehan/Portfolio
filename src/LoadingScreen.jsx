import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [commandsCompleted, setCommandsCompleted] = useState([]);
    const [showCursor, setShowCursor] = useState(true);
    const hasRun = useRef(false);

    const terminalCommands = [
        'npm install portfolio-dependencies',
        'Initializing React components...',
        'Loading Framer Motion animations...',
        'Setting up Tailwind CSS...',
        'Configuring dark/light themes...',
        'Establishing router connections...',
        'Optimizing performance...',
        'Portfolio ready! 🚀',
    ];

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        setCommandsCompleted([]);

        terminalCommands.forEach((command, index) => {
            setTimeout(() => {
                setCommandsCompleted(prev => [...prev, `$ ${command}`]);
            }, index * 500);
        });

        setTimeout(() => {
        }, terminalCommands.length * 500 + 500);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
            <div className="bg-gray-900 border-2 border-cyan-400 rounded-lg p-6 max-w-md w-full mx-4 shadow-lg shadow-cyan-400/50">
                <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-gray-400 text-sm">Terminal</div>
                </div>

                <div className="font-mono text-sm min-h-[200px]">
                    {commandsCompleted.map((command, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-green-400 mb-1"
                        >
                            {command}
                        </motion.div>
                    ))}
                    <div className="text-green-400">
                        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                            _
                        </span>
                    </div>
                </div>

                <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                        className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: "linear" }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
