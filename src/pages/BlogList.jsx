import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Rss } from 'lucide-react';
import { StampCard } from '@/components/ui/StampCard';
import Magnetic from '../components/Magnetic';
import '../components/BlogComingSoon.css';

export default function BlogList() {
    const [dots, setDots] = useState('');

    // Animated dots for "preparing for dispatch..."
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="blog-coming-soon" id="blog">
            {/* Film strip top decoration */}
            <div className="blog-filmstrip" />

            <div className="container blog-coming-soon-container">
                {/* Animated stamp card */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                    className="blog-stamp-wrapper"
                >
                    <StampCard variant="dark" stampNumber="BLOG" showBarcode>
                        <div className="blog-stamp-inner">
                            {/* Wax seal */}
                            <motion.div
                                className="blog-seal"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
                            >
                                <span className="blog-seal-icon">✦</span>
                            </motion.div>

                            {/* Hindi text */}
                            <motion.p
                                className="blog-hindi-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                जल्द आ रहा है
                            </motion.p>

                            {/* COMING SOON - typewriter style */}
                            <motion.h1
                                className="blog-coming-title"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                {'COMING SOON'.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.8 + i * 0.06,
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 200
                                        }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {/* Decorative line */}
                            <motion.div
                                className="blog-divider"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.5, duration: 0.6 }}
                            />

                            {/* Dispatch text */}
                            <motion.p
                                className="blog-dispatch-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8, duration: 0.5 }}
                            >
                                This section is being prepared for dispatch{dots}
                            </motion.p>

                            {/* Blog icon */}
                            <motion.div
                                className="blog-icon-row"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.0, duration: 0.4 }}
                            >
                                <Rss size={16} />
                                <span>THOUGHTS & STORIES</span>
                                <Rss size={16} />
                            </motion.div>
                        </div>
                    </StampCard>
                </motion.div>

                {/* Back to Home button */}
                <motion.div
                    className="blog-back-btn"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.5 }}
                >
                    <Magnetic>
                        <Link to="/" className="btn btn-secondary">
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                    </Magnetic>
                </motion.div>
            </div>
        </div>
    );
}
