import { useState, useEffect } from 'react';

export default function WorldClock() {
    const [time, setTime] = useState(new Date());
    const [visitorTimezone, setVisitorTimezone] = useState('');

    useEffect(() => {
        // Update time every second
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Get visitor's timezone
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setVisitorTimezone(tz.replace(/_/g, ' '));
        } catch {
            setVisitorTimezone('Local Time');
        }

        return () => clearInterval(timer);
    }, []);

    // Format time for Indore (IST)
    const indoreTime = time.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Format time for visitor's locale
    const visitorTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Get short timezone labels
    const visitorCity = visitorTimezone.split('/').pop() || 'Your Location';

    return (
        <div className="world-clock">
            <div className="clock-item clock-primary">
                <span className="clock-city">INDORE</span>
                <span className="clock-time">{indoreTime}</span>
            </div>
            <div className="clock-divider">✦</div>
            <div className="clock-item">
                <span className="clock-city">{visitorCity.toUpperCase()}</span>
                <span className="clock-time">{visitorTime}</span>
            </div>
        </div>
    );
}
