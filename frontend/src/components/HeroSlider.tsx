'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './HeroSlider.module.css';

interface Slide {
    title: string;
    subtitle: string;
    image?: string;
    gradient?: string;
}

interface HeroSliderProps {
    slides: Slide[];
    cta: string;
    ctaLink: string;
    autoPlayInterval?: number;
}

// Beautiful gradient backgrounds for each slide
const slideGradients = [
    'linear-gradient(135deg, #1a365d 0%, #2c5282 30%, #3182ce 70%, #63b3ed 100%)', // Deep ocean blue
    'linear-gradient(135deg, #744210 0%, #c05621 30%, #dd6b20 70%, #ed8936 100%)', // Warm sunset
    'linear-gradient(135deg, #553c9a 0%, #6b46c1 30%, #805ad5 70%, #b794f4 100%)', // Royal purple
    'linear-gradient(135deg, #22543d 0%, #276749 30%, #38a169 70%, #68d391 100%)', // Forest green
    'linear-gradient(135deg, #702459 0%, #97266d 30%, #d53f8c 70%, #ed64a6 100%)', // Rose pink
];

export default function HeroSlider({
    slides,
    cta,
    ctaLink,
    autoPlayInterval = 6000
}: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (isPaused || slides.length <= 1) return;

        const timer = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide, autoPlayInterval, slides.length]);

    return (
        <section
            className={styles.hero}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Dynamic Background */}
            <div
                className={styles.dynamicBackground}
                style={{ background: slideGradients[currentSlide % slideGradients.length] }}
            />

            {/* Animated Particles */}
            <div className={styles.particles} aria-hidden="true">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Background Pattern */}
            <div className={styles.pattern} aria-hidden="true" />

            {/* Slides Container */}
            <div className={styles.slidesContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                        aria-hidden={index !== currentSlide}
                    >
                        <div className={styles.content}>
                            <span className={styles.slideNumber}>0{index + 1}</span>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <p className={styles.subtitle}>{slide.subtitle}</p>
                            <a href={ctaLink} className={styles.cta}>
                                {cta}
                                <span className={styles.ctaIcon}>→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        className={`${styles.navButton} ${styles.navPrev}`}
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.navButton} ${styles.navNext}`}
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.progressBar} ${index === currentSlide ? styles.activeProgress : ''}`}
                        onClick={() => goToSlide(index)}
                    >
                        <div className={styles.progressFill} />
                    </div>
                ))}
            </div>

            {/* Decorative Elements */}
            <div className={styles.decorCircle1} aria-hidden="true" />
            <div className={styles.decorCircle2} aria-hidden="true" />
            <div className={styles.decorLine} aria-hidden="true" />
        </section>
    );
}
