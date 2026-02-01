import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Generate barcode data - called only during useState initialization
let barcodeCounter = 0;
const generateBarcodeData = () => {
    barcodeCounter++;
    const seed = barcodeCounter;
    const widths = [...Array(20)].map((_, i) => ((seed * 17 + i * 13) % 20) / 10 + 1);
    const number = String(seed * 1234 % 9999).padStart(4, '0');
    return { widths, number };
};

/**
 * StampCard Component
 * Creates a vintage postal stamp-style card with perforated edges
 */
export function StampCard({
    children,
    className,
    variant = 'default',
    showBarcode = false,
    stampNumber,
    postmark,
    ...props
}) {
    const variants = {
        default: {
            bg: 'var(--stamp-cream)',
            border: 'var(--stamp-black)',
            accent: 'var(--stamp-red)',
        },
        dark: {
            bg: 'var(--stamp-black)',
            border: 'var(--stamp-cream)',
            accent: 'var(--stamp-gold)',
        },
        accent: {
            bg: 'var(--stamp-red)',
            border: 'var(--stamp-black)',
            accent: 'var(--stamp-cream)',
        },
    };

    const v = variants[variant];

    // Use lazy state initialization for barcode data
    const [barcodeData] = useState(generateBarcodeData);
    const { widths: barcodeWidths, number: barcodeNumber } = barcodeData;

    return (
        <div
            className={cn('stamp-card', `stamp-card--${variant}`, className)}
            data-stamp-number={stampNumber}
            style={{
                position: 'relative',
                background: v.bg,
                border: `3px solid ${v.border}`,
                padding: '24px',
                ...props.style,
            }}
            {...props}
        >
            {/* Perforated edge - top */}
            <div className="stamp-perforation stamp-perforation--top" />
            {/* Perforated edge - bottom */}
            <div className="stamp-perforation stamp-perforation--bottom" />
            {/* Perforated edge - left */}
            <div className="stamp-perforation stamp-perforation--left" />
            {/* Perforated edge - right */}
            <div className="stamp-perforation stamp-perforation--right" />

            {/* Stamp number */}
            {stampNumber && (
                <div className="stamp-number">
                    № {stampNumber}
                </div>
            )}

            {/* Barcode */}
            {showBarcode && (
                <div className="stamp-barcode">
                    <div className="barcode-lines">
                        {barcodeWidths.map((width, i) => (
                            <div
                                key={i}
                                className="barcode-line"
                                style={{
                                    width: `${width}px`,
                                    height: '100%',
                                    background: 'var(--stamp-black)',
                                }}
                            />
                        ))}
                    </div>
                    <span className="barcode-text">LR-2026-{barcodeNumber}</span>
                </div>
            )}

            {/* Postmark Container (Clipped) */}
            {postmark && (
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
                    {postmark}
                </div>
            )}

            {/* Content */}
            <div className="stamp-content">
                {children}
            </div>
        </div>
    );
}

/**
 * ReceiptCard Component
 * Creates a receipt-style card with torn edges
 */
export function ReceiptCard({
    children,
    className,
    title,
    date,
    ...props
}) {
    return (
        <div
            className={cn('receipt-card', className)}
            {...props}
        >
            {/* Torn edge top */}
            <div className="receipt-tear receipt-tear--top" />

            {/* Header */}
            {(title || date) && (
                <div className="receipt-header">
                    {title && <span className="receipt-title">{title}</span>}
                    {date && <span className="receipt-date">{date}</span>}
                </div>
            )}

            {/* Dotted line */}
            <div className="receipt-divider" />

            {/* Content */}
            <div className="receipt-content">
                {children}
            </div>

            {/* Torn edge bottom */}
            <div className="receipt-tear receipt-tear--bottom" />
        </div>
    );
}

/**
 * PostalBadge Component
 * Creates a circular postal stamp badge
 */
export function PostalBadge({
    children,
    className,
    size = 'md',
    ...props
}) {
    const sizes = {
        sm: { width: '60px', height: '60px', fontSize: '10px' },
        md: { width: '80px', height: '80px', fontSize: '12px' },
        lg: { width: '100px', height: '100px', fontSize: '14px' },
    };

    return (
        <div
            className={cn('postal-badge', className)}
            style={{
                ...sizes[size],
                borderRadius: '50%',
                border: '3px solid var(--stamp-black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: 'var(--stamp-cream)',
                boxShadow: 'inset 0 0 0 4px var(--stamp-cream), inset 0 0 0 6px var(--stamp-black)',
            }}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * DevanagariText Component
 * Displays text with Devanagari/Hindi styling
 */
export function DevanagariText({
    children,
    className,
    size = 'md',
    ...props
}) {
    const sizes = {
        sm: '24px',
        md: '48px',
        lg: '72px',
        xl: '96px',
    };

    return (
        <span
            className={cn('devanagari-text', className)}
            style={{
                fontFamily: "'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif",
                fontSize: sizes[size],
                fontWeight: '700',
                lineHeight: 1.2,
                color: 'var(--stamp-black)',
            }}
            {...props}
        >
            {children}
        </span>
    );
}

export default StampCard;
