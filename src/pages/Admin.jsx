import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Admin() {
    const { currentUser, login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Editor state
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setError('');
            await login(email, password);
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        }
    }

    async function handleLogout() {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            setError('Failed to log out');
        }
    }

    async function handlePublish(e) {
        e.preventDefault();
        if (!title || !content) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'blogs'), {
                title,
                excerpt,
                content,
                createdAt: serverTimestamp(),
                author: currentUser.email
            });
            alert('Blog published successfully!');
            setTitle('');
            setExcerpt('');
            setContent('');
        } catch (err) {
            alert('Error publishing blog: ' + err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!currentUser) {
        return (
            <div className="section container" style={{ paddingTop: '120px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-red)' }}>
                        <Lock size={32} />
                    </div>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>Admin Access</h2>
                    {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.05)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.05)' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="section container" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>
                    <span className="title-text">Post Editor</span>
                </h1>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                    Logout
                </button>
            </div>

            <div className="card" style={{ padding: '2rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter blog title..."
                            style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.05)', color: 'inherit' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Excerpt (Short Summary)</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            placeholder="Brief summary for the blog card..."
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.05)', color: 'inherit', resize: 'vertical' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content (Markdown Supported)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={15}
                            placeholder="# Heading\n\nWrite your awesome content here..."
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.05)', color: 'inherit', fontFamily: 'monospace', lineHeight: '1.5', resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={{ minWidth: '150px' }}
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
