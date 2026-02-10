import { useEffect, useRef, useState } from 'react';

// Check touch device immediately on module load (not inside component)
const isTouchDevice = () => {
    if (typeof window === 'undefined') return true; // SSR safety
    return window.matchMedia("(pointer: coarse)").matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
};

export default function MouseSpotlight() {
    // Early bail - check on first render, no effects needed
    const [isTouch] = useState(isTouchDevice);

    const spotlightRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const spotlightPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Don't set up anything on touch devices
        if (isTouch) return;

        const spotlight = spotlightRef.current;
        if (!spotlight) return;

        let animationFrameId;

        const onMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
        };

        // Smooth animation loop with lerp
        const loop = () => {
            const ease = 0.15;

            const dx = mousePosition.current.x - spotlightPosition.current.x;
            const dy = mousePosition.current.y - spotlightPosition.current.y;

            spotlightPosition.current.x += dx * ease;
            spotlightPosition.current.y += dy * ease;

            // Use GPU-composited transform instead of background
            spotlight.style.transform = `translate3d(${spotlightPosition.current.x - 300}px, ${spotlightPosition.current.y - 300}px, 0)`;

            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        loop();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isTouch]);

    // Return null immediately on touch - no DOM element created
    if (isTouch) return null;

    return (
        <div
            ref={spotlightRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '600px',
                height: '600px',
                pointerEvents: 'none',
                zIndex: 2,
                willChange: 'transform',
                background: 'radial-gradient(300px circle at center, rgba(196, 154, 60, 0.25), rgba(196, 154, 60, 0.12) 40%, transparent 70%)',
                borderRadius: '50%',
            }}
            aria-hidden="true"
        />
    );
}
