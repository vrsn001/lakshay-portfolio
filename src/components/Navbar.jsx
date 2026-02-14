import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
    return (
        <nav className="nav">
            <div className="nav-container">
                <a href="/#hero" className="nav-logo">
                    <span className="nav-logo-hindi">लक्ष्य</span>
                    LR
                </a>
                <div className="nav-menu">
                    <a href="/#about" className="nav-link">About</a>
                    <a href="/#experience" className="nav-link">Experience</a>
                    <a href="/#skills" className="nav-link">Skills</a>
                    <a href="/#education" className="nav-link">Education</a>
                    <a href="/#contact" className="nav-link">Contact</a>
                    <a href="/blog" className="nav-link">Blog</a>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
                    >
                        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
