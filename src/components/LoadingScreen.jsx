import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onLoadComplete }) {
    const [stage, setStage] = useState('seal'); // seal -> open -> reveal -> fadeOut

    useEffect(() => {
        // Stage 1: Show seal with pulse (0.8s)
        const sealTimer = setTimeout(() => setStage('open'), 800);

        // Stage 2: Envelope opens (1.2s)
        const openTimer = setTimeout(() => setStage('reveal'), 2000);

        // Stage 3: Content reveals (0.8s)
        const revealTimer = setTimeout(() => setStage('fadeOut'), 2800);

        // Stage 4: Fade out and complete (0.5s)
        const fadeTimer = setTimeout(() => {
            if (onLoadComplete) onLoadComplete();
        }, 3300);

        return () => {
            clearTimeout(sealTimer);
            clearTimeout(openTimer);
            clearTimeout(revealTimer);
            clearTimeout(fadeTimer);
        };
    }, [onLoadComplete]);

    return (
        <div className={`loading-screen ${stage}`}>
            <div className="envelope-container">
                {/* Envelope back */}
                <div className="envelope-back"></div>

                {/* Envelope flap (opens) */}
                <div className="envelope-flap">
                    <div className="flap-triangle"></div>
                </div>

                {/* Wax seal stamp */}
                <div className="wax-seal">
                    <div className="seal-text">LR</div>
                </div>

                {/* Letter emerging from envelope */}
                <div className="letter">
                    <div className="letter-header">
                        <div className="letter-logo">लक्ष्य</div>
                        <div className="letter-name">LAKSHAY ROHILLA</div>
                        <div className="letter-tagline">Campaign Manager</div>
                    </div>
                </div>

                {/* Envelope front */}
                <div className="envelope-front"></div>
            </div>
        </div>
    );
}
