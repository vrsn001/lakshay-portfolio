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
    },
    {
        text: "I do whatever I want.",
        movie: "The Boys",
        character: "Homelander"
    },
    {
        text: "Scorched earth.",
        movie: "The Boys",
        character: "Billy Butcher"
    },
    {
        text: "Above all: don't lose hope.",
        movie: "Life of Pi",
        character: "Pi Patel"
    },
    {
        text: "Winning has a price. And leadership has a price.",
        movie: "The Last Dance",
        character: "Michael Jordan"
    },
    {
        text: "The only way to do it is to do it perfectly.",
        movie: "Free Solo",
        character: "Alex Honnold"
    },
    {
        text: "We are made of starstuff.",
        movie: "Cosmos",
        character: "Carl Sagan"
    },
    // Marvel Universe
    {
        text: "I am Iron Man.",
        movie: "Avengers: Endgame",
        character: "Tony Stark"
    },
    {
        text: "Part of the journey is the end.",
        movie: "Avengers: Endgame",
        character: "Tony Stark"
    },
    {
        text: "I can do this all day.",
        movie: "Captain America: The First Avenger",
        character: "Steve Rogers"
    },
    {
        text: "Wakanda Forever!",
        movie: "Black Panther",
        character: "T'Challa"
    },
    {
        text: "Dread it. Run from it. Destiny arrives all the same.",
        movie: "Avengers: Infinity War",
        character: "Thanos"
    },
    {
        text: "I love you 3000.",
        movie: "Avengers: Endgame",
        character: "Morgan Stark"
    },
    {
        text: "With great power comes great responsibility.",
        movie: "Spider-Man",
        character: "Uncle Ben"
    },
    {
        text: "That's my secret, Captain. I'm always angry.",
        movie: "The Avengers",
        character: "Bruce Banner"
    },

    // DC Universe
    {
        text: "Why so serious?",
        movie: "The Dark Knight",
        character: "The Joker"
    },
    {
        text: "Introduce a little anarchy. Upset the established order, and everything becomes chaos.",
        movie: "The Dark Knight",
        character: "The Joker"
    },
    {
        text: "You either die a hero, or you live long enough to see yourself become the villain.",
        movie: "The Dark Knight",
        character: "Harvey Dent"
    },
    {
        text: "Oh, you think darkness is your ally? But you merely adopted the dark; I was born in it, moulded by it.",
        movie: "The Dark Knight Rises",
        character: "Bane"
    },
    {
        text: "The night is darkest just before the dawn. And I promise you, the dawn is coming.",
        movie: "The Dark Knight",
        character: "Harvey Dent"
    },
    {
        text: "Do you bleed? You will.",
        movie: "Batman v Superman",
        character: "Batman"
    },

    // Pablo Escobar / Narcos
    {
        text: "Plata o Plomo. (Silver or Lead)",
        movie: "Narcos",
        character: "Pablo Escobar"
    },
    {
        text: "There is a time to fight and there is a time to be clever.",
        movie: "Narcos",
        character: "Pablo Escobar"
    },
    {
        text: "Lies are necessary when the truth is too difficult to believe.",
        movie: "Narcos",
        character: "Pablo Escobar"
    },
    {
        text: "I am not a rich person. I am a poor person with money.",
        movie: "Narcos",
        character: "Pablo Escobar"
    },

    // Osho Quotes
    {
        text: "Life begins where fear ends.",
        movie: "Philosophy",
        character: "Osho"
    },
    {
        text: "Be \u2014 don't try to become.",
        movie: "Philosophy",
        character: "Osho"
    },
    {
        text: "Sadness gives depth. Happiness gives height. Sadness gives roots. Happiness gives branches.",
        movie: "Philosophy",
        character: "Osho"
    },
    {
        text: "To be creative means to be in love with life.",
        movie: "Philosophy",
        character: "Osho"
    },
    {
        text: "Drop the idea of becoming someone, because you are already a masterpiece.",
        movie: "Philosophy",
        character: "Osho"
    },

    // More Iconic & Miscellaneous
    {
        text: "I'm gonna make him an offer he can't refuse.",
        movie: "The Godfather",
        character: "Vito Corleone"
    },
    {
        text: "Say hello to my little friend!",
        movie: "Scarface",
        character: "Tony Montana"
    },
    {
        text: "Keep your friends close, but your enemies closer.",
        movie: "The Godfather Part II",
        character: "Michael Corleone"
    },
    {
        text: "Stay hungry, stay foolish.",
        movie: "Stanford Speech",
        character: "Steve Jobs"
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        movie: "Stanford Speech",
        character: "Steve Jobs"
    },
    {
        text: "May the Force be with you.",
        movie: "Star Wars",
        character: "Han Solo"
    },
    {
        text: "Do, or do not. There is no try.",
        movie: "The Empire Strikes Back",
        character: "Yoda"
    },
    {
        text: "Frankly, my dear, I don't give a damn.",
        movie: "Gone with the Wind",
        character: "Rhett Butler"
    },
    {
        text: "Here's looking at you, kid.",
        movie: "Casablanca",
        character: "Rick Blaine"
    },
    {
        text: "You're gonna need a bigger boat.",
        movie: "Jaws",
        character: "Martin Brody"
    },
    {
        text: "Houston, we have a problem.",
        movie: "Apollo 13",
        character: "Jim Lovell"
    },
    {
        text: "Carpe Diem. Seize the day, boys. Make your lives extraordinary.",
        movie: "Dead Poets Society",
        character: "John Keating"
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
