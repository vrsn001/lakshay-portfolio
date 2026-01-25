import { useState, useEffect } from 'react';
import './MovieQuotes.css';

const QUOTES = [
    {
        text: "The things you own end up owning you.",
        movie: "Fight Club",
        character: "Tyler Durden"
    },
    {
        text: "It's only after we've lost everything that we're free to do anything.",
        movie: "Fight Club",
        character: "Tyler Durden"
    },
    {
        text: "Why do we fall? So we can learn to pick ourselves up.",
        movie: "Batman Begins",
        character: "Thomas Wayne"
    },
    {
        text: "It's not who I am underneath, but what I do that defines me.",
        movie: "Batman Begins",
        character: "Batman"
    },
    {
        text: "There's a point at 7,000 RPM... where everything fades. The machine becomes weightless. Just disappears.",
        movie: "Ford v Ferrari",
        character: "Ken Miles"
    },
    {
        text: "This is your life and it's ending one minute at a time.",
        movie: "Fight Club",
        character: "Narrator"
    },
    {
        text: "Some men aren't looking for anything logical, like money. They can't be bought, bullied, reasoned, or negotiated with. Some men just want to watch the world burn.",
        movie: "The Dark Knight",
        character: "Alfred Pennyworth"
    },
    {
        text: "The only thing standing between you and your goal is the bullshit story you keep telling yourself as to why you can't achieve it.",
        movie: "The Wolf of Wall Street",
        character: "Jordan Belfort"
    },
    {
        text: "Great men are not born great, they grow great.",
        movie: "The Godfather",
        character: "Vito Corleone"
    },
    {
        text: "What we do in life, echoes in eternity.",
        movie: "Gladiator",
        character: "Maximus"
    },
    {
        text: "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",
        movie: "Rocky Balboa",
        character: "Rocky"
    },
    {
        text: "We've always defined ourselves by the ability to overcome the impossible.",
        movie: "Interstellar",
        character: "Cooper"
    },
    {
        text: "I can only show you the door. You're the one that has to walk through it.",
        movie: "The Matrix",
        character: "Morpheus"
    },
    {
        text: "There are no two words in the English language more harmful than 'good job'.",
        movie: "Whiplash",
        character: "Terence Fletcher"
    },
    {
        text: "Get busy living, or get busy dying.",
        movie: "The Shawshank Redemption",
        character: "Andy Dufresne"
    },
    {
        text: "I feel the need... the need for speed!",
        movie: "Top Gun",
        character: "Maverick"
    },
    {
        text: "The World is Yours.",
        movie: "Scarface",
        character: "Tony Montana"
    }
];

const MovieQuotes = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Random interval between 10s (10000ms) and 15s (15000ms)
        // For a smoother progress bar, we'll fix it to 12s for now, or we can make it dynamic.
        // The user asked for "10-15 seconds", but 8s feels snappier.
        const DURATION = 8000;
        const UPDATE_INTERVAL = 100; // Update progress every 100ms
        const steps = DURATION / UPDATE_INTERVAL;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = (currentStep / steps) * 100;
            setProgress(newProgress);

            if (currentStep >= steps) {
                // Trigger generic change
                changeQuote();
                currentStep = 0;
            }
        }, UPDATE_INTERVAL);

        return () => clearInterval(timer);
    }, [currentIndex]); // Re-run effect isn't strictly necessary for the timer structure, but simplifying for readability

    const changeQuote = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                // Random selection ensuring no repeat
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * QUOTES.length);
                } while (nextIndex === prevIndex && QUOTES.length > 1);
                return nextIndex;
            });
            setIsFading(false);
            setProgress(0);
        }, 500); // Wait for fade out
    };

    const currentQuote = QUOTES[currentIndex];

    return (
        <section className="movie-quotes-section">
            <div className="movie-quotes-container">
                <div className="quote-card">
                    <div className="cinema-header">
                        ★ Vintage Cinema Archive ★
                    </div>

                    <div className={`quote-text ${isFading ? 'fade-out' : ''}`}>
                        "{currentQuote.text}"
                    </div>

                    <div className={`quote-source ${isFading ? 'fade-out' : ''}`}>
                        <span className="movie-title">{currentQuote.movie}</span>
                        <span className="character-name">— {currentQuote.character}</span>
                    </div>

                    <div className="quote-timer" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </section>
    );
};

export default MovieQuotes;
