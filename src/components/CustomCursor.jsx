import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    // Use refs for values that change constantly to avoid re-renders
    const mousePosition = useRef({ x: 0, y: 0 });
    const cursorPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        let animationFrameId;

        // Check for touch device
        const checkTouch = () => {
            setIsTouch(window.matchMedia("(pointer: coarse)").matches);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);

        // Initialize cursor position to off-screen or center
        cursorPosition.current = { x: -100, y: -100 };

        const onMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onMouseLeave = () => {
            setIsVisible(false);
        };

        const onMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            // Check if the target is a link, button, or interactive element
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.tagName === 'SELECT' ||
                e.target.tagName === 'LABEL' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Animation loop for smooth inertia
        const loop = () => {
            // Lerp factor (0.1 = slow/smooth, 0.5 = fast)
            const ease = 0.15;

            const dx = mousePosition.current.x - cursorPosition.current.x;
            const dy = mousePosition.current.y - cursorPosition.current.y;

            cursorPosition.current.x += dx * ease;
            cursorPosition.current.y += dy * ease;

            if (cursor) {
                cursor.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        if (isTouch) return;

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseover', handleMouseOver);

        loop();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', checkTouch);
        };
    }, [isVisible, isTouch]);

    if (isTouch) return null;

    return (
        <>
            <style>{`
        body { cursor: none; }
        a, button, input, textarea, select { cursor: none; }
        @media (hover: none) and (pointer: coarse) {
            body { cursor: auto; }
            a, button, input, textarea, select { cursor: auto; }
        }
      `}</style>
            <div
                ref={cursorRef}
                className="custom-cursor"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    willChange: 'transform'
                }}
            >
                {/* Base Cursor - Pen Nib */}
                <div style={{
                    width: '20px',
                    height: '20px',
                    transition: 'transform 0.2s ease',
                    transform: isHovering ? 'scale(1.5) rotate(-45deg)' : 'scale(1) rotate(0deg)',
                }}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                        <path d="M12 2L2 22L12 18L22 22L12 2Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" />
                        <path d="M12 2V18" stroke="#000" strokeWidth="1" />
                    </svg>
                </div>

                {/* Hover Highlight Ring */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isHovering ? '40px' : '0px',
                    height: isHovering ? '40px' : '0px',
                    borderRadius: '50%',
                    border: '1px dashed #F5F0E1',
                    opacity: 0.5,
                    transition: 'all 0.3s ease',
                    animation: isHovering ? 'spin 4s linear infinite' : 'none'
                }} />
            </div>
            <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>
        </>
    );
}
