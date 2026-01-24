import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        const updatePosition = (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };

        const handleMouseOver = (e) => {
            // Check if the target is a link, button, or interactive element
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <style>{`
        body { cursor: none; }
        a, button, input, textarea, select { cursor: none; }
      `}</style>
            <div
                className="custom-cursor"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            >
                {/* Base Cursor - Pen Nib */}
                <div style={{
                    width: '20px',
                    height: '20px',
                    transition: 'all 0.2s ease',
                    transform: isHovering ? 'scale(1.5) rotate(-45deg)' : 'scale(1) rotate(0deg)',
                    opacity: 1,
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
