'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './HeroSlider.module.css';

interface Slide {
    title: string;
    subtitle: string;
    image?: string;
}

interface HeroSliderProps {
    slides: Slide[];
    cta: string;
    ctaLink: string;
    autoPlayInterval?: number;
}

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

            {/* Dots Indicator */}
            {slides.length > 1 && (
                <div className={styles.dots}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentSlide ? 'true' : 'false'}
                        />
                    ))}
                </div>
            )}

            {/* Decorative Elements */}
            <div className={styles.decorCircle1} aria-hidden="true" />
            <div className={styles.decorCircle2} aria-hidden="true" />
        </section>
    );
}
