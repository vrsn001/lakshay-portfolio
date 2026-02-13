import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Magnetic({ children, strength = 0.5 }) {
    const ref = useRef(null);
    const [isTouch, setIsTouch] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Use spring for smooth movement without React re-renders
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

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
        x.set(middleX * strength);
        y.set(middleY * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    if (isTouch) {
        return <div style={{ display: 'inline-block' }}>{children}</div>;
    }

    return (
        <motion.div
            style={{ position: 'relative', display: 'inline-block', x: springX, y: springY }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}
