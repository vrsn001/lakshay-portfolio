import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * LiquidGlassCard Component
 * Creates a beautiful glassmorphism card with blur, glow, and shadow effects
 * 
 * @param {Object} props
 * @param {string} props.blurIntensity - 'none' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} props.glowIntensity - 'none' | 'sm' | 'md' | 'lg'
 * @param {string} props.shadowIntensity - 'none' | 'sm' | 'md' | 'lg'
 * @param {string} props.borderRadius - CSS border radius value
 * @param {boolean} props.draggable - Enable drag functionality
 * @param {string} props.className - Additional CSS classes
 * @param {React.CSSProperties} props.style - Additional inline styles
 * @param {React.ReactNode} props.children - Content inside the card
 */
export function LiquidGlassCard({
    blurIntensity = 'md',
    glowIntensity = 'md',
    shadowIntensity = 'md',
    borderRadius = '16px',
    draggable = false,
    className,
    style,
    children,
    ...props
}) {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Blur intensity values
    const blurValues = {
        none: '0px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    };

    // Glow intensity values
    const glowValues = {
        none: 'none',
        sm: '0 0 20px rgba(255, 255, 255, 0.1)',
        md: '0 0 40px rgba(255, 255, 255, 0.15)',
        lg: '0 0 60px rgba(255, 255, 255, 0.2)',
    };

    // Shadow intensity values
    const shadowValues = {
        none: 'none',
        sm: '0 4px 16px rgba(0, 0, 0, 0.1)',
        md: '0 8px 32px rgba(0, 0, 0, 0.15)',
        lg: '0 12px 48px rgba(0, 0, 0, 0.2)',
    };

    // Mouse move effect for glow
    useEffect(() => {
        if (!cardRef.current) return;

        const handleMouseMove = (e) => {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const card = cardRef.current;
        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Dragging functionality
    useEffect(() => {
        if (!draggable) return;

        const handleMouseMove = (e) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, draggable]);

    const handleMouseDown = (e) => {
        if (!draggable) return;
        const rect = cardRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsDragging(true);
    };

    const cardStyle = {
        position: draggable ? 'absolute' : 'relative',
        left: draggable ? position.x : undefined,
        top: draggable ? position.y : undefined,
        borderRadius,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: `blur(${blurValues[blurIntensity]})`,
        WebkitBackdropFilter: `blur(${blurValues[blurIntensity]})`,
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: `${shadowValues[shadowIntensity]}, ${glowValues[glowIntensity]}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
        cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
        transition: isDragging ? 'none' : 'all 0.3s ease',
        overflow: 'hidden',
        ...style,
    };

    return (
        <div
            ref={cardRef}
            className={cn('liquid-glass-card', className)}
            style={cardStyle}
            onMouseDown={handleMouseDown}
            {...props}
        >
            {/* Animated glow effect following mouse */}
            <div
                className="liquid-glass-glow"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                    opacity: glowIntensity !== 'none' ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                }}
            />
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
}

/**
 * LiquidGlassContainer Component
 * A container with background image and glass cards
 */
export function LiquidGlassContainer({
    backgroundImage,
    className,
    style,
    children,
    ...props
}) {
    return (
        <div
            className={cn('liquid-glass-container', className)}
            style={{
                position: 'relative',
                background: backgroundImage
                    ? `url("${backgroundImage}") center / cover no-repeat`
                    : undefined,
                overflow: 'hidden',
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * LiquidGlassButton Component
 * A glass-style button
 */
export function LiquidGlassButton({
    variant = 'default',
    className,
    children,
    ...props
}) {
    const variants = {
        default: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            hoverBg: 'rgba(255, 255, 255, 0.2)',
        },
        solid: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1a1a1a',
            hoverBg: 'rgba(255, 255, 255, 1)',
        },
        accent: {
            background: 'linear-gradient(135deg, rgba(212, 163, 45, 0.8) 0%, rgba(196, 154, 60, 0.9) 100%)',
            color: '#1a1a1a',
            hoverBg: 'linear-gradient(135deg, rgba(212, 163, 45, 1) 0%, rgba(196, 154, 60, 1) 100%)',
        },
    };

    const v = variants[variant];

    return (
        <button
            className={cn('liquid-glass-button', className)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: v.background,
                color: v.color,
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
                e.target.style.background = v.hoverBg;
                e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.target.style.background = v.background;
                e.target.style.transform = 'translateY(0)';
            }}
            {...props}
        >
            {children}
        </button>
    );
}

export default LiquidGlassCard;
