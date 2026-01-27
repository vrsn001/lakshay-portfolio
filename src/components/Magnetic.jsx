import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Magnetic({ children, strength = 0.5 }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    const handleMouse = (e) => {
        if (isTouch) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    if (isTouch) {
        return <div style={{ display: 'inline-block' }}>{children}</div>;
    }

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: 'relative', display: 'inline-block' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}

