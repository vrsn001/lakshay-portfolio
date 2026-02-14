import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import MainMagnetic from '../components/Magnetic';

export default function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const docRef = doc(db, 'blogs', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    if (loading) return <div className="section container" style={{ paddingTop: '120px', textAlign: 'center' }}>Loading...</div>;
    if (!post) return <div className="section container" style={{ paddingTop: '120px', textAlign: 'center' }}>Post not found</div>;

    return (
        <div className="section container" style={{ paddingTop: '120px', minHeight: '100vh', maxWidth: '800px' }}>
            <MainMagnetic>
                <Link to="/blog" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <ArrowLeft size={16} /> Back to Blogs
                </Link>
            </MainMagnetic>

            <article className="blog-content">
                <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} /> {post.createdAt?.toDate().toLocaleDateString()}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={14} /> {post.author}</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Bebas Neue', lineHeight: '1.1', letterSpacing: '2px', margin: '0 0 1rem 0' }}>
                        {post.title}
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, fontStyle: 'italic' }}>
                        {post.excerpt}
                    </p>
                </header>

                <div style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                    {post.content}
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
                    <MainMagnetic>
                        <button className="btn btn-primary" onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copied to clipboard!');
                        }}>
                            <Share2 size={16} style={{ marginRight: '8px' }} /> Share this post
                        </button>
                    </MainMagnetic>
                </div>
            </article>
        </div>
    );
}
