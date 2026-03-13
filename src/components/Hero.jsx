import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { personalInfo, scratchPaths } from '../mockData';
import HandDrawnScratch from './HandDrawnScratch';
import HeroImage from '../images/hero-img.webp';
import TypingText from './TypingText';

const SPRING_CONFIG = { stiffness: 120, damping: 30 };
const SCROLL_RANGES = {
    HERO_END: 0.1,
    ABOUT_START: 0.1,
    ABOUT_END: 0.2,
};

const BOUNCING_ICONS = [
    {
        id: 1,
        className: 'top-1/2 left-1/3',
        duration: 2,
        delay: 0,
        path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    },
    {
        id: 2,
        className: 'top-3/4 right-1/3',
        duration: 2.5,
        delay: 0.5,
        path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
        id: 3,
        className: 'top-1/3 right-1/3',
        duration: 3,
        delay: 1,
        path: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
];

const SCRATCHES = [
    { scratch: scratchPaths.path1, position: 'left-20 bottom-20', delay: 4 },
    { scratch: scratchPaths.path2, position: 'left-20 top-20', delay: 0.5 },
    { scratch: scratchPaths.path1, position: 'right-20 top-20', delay: 6 },
    { scratch: scratchPaths.path2, position: 'right-20 bottom-20', delay: 2 },
];

const QUICK_LINKS = [
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
    { icon: Github, href: personalInfo.socialLinks.github },
    { icon: Linkedin, href: personalInfo.socialLinks.linkedin },
    { icon: Instagram, href: personalInfo.socialLinks.instagram },
    { icon: Mail, href: `mailto:${personalInfo.email}` },
];

export default function Hero() {
    const heroRef = useRef(null);
    const [yOffset, setYOffset] = useState(215);
    const [isDesktop, setIsDesktop] = useState(false);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Calculate responsive Y position based on viewport
    useEffect(() => {
        const calculateYOffset = () => {
            const vh = window.innerHeight;
            const vw = window.innerWidth;

            // Check if desktop (1024px and above)
            setIsDesktop(vw >= 1024);

            // Mobile (< 640px) - smaller screens, adjusted for pt-6
            if (vw < 640) return vh * 0.38;
            // Mobile-Tablet (640px - 768px)
            if (vw < 768) return vh * 0.36;
            // Tablet (768px - 1024px)
            if (vw < 1024) return vh * 0.32;
            // Desktop (>= 1024px)
            return vh * 0.28;
        };

        // Set initial value
        setYOffset(calculateYOffset());

        // Update on resize
        const handleResize = () => {
            setYOffset(calculateYOffset());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Hero animations - only apply on desktop (>= 1024px)
    const heroX = useSpring(
        useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], isDesktop ? [0, -400] : [0, 0]),
        SPRING_CONFIG
    );
    const heroY = useSpring(
        useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], isDesktop ? [0, yOffset] : [0, 0]),
        SPRING_CONFIG
    );
    const heroScale = useSpring(
        useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], isDesktop ? [1, 0.6] : [1, 1]),
        SPRING_CONFIG
    );

    // About animations
    const aboutOpacity = useSpring(useTransform(scrollYProgress, [SCROLL_RANGES.ABOUT_START, SCROLL_RANGES.ABOUT_END], [0, 1]), SPRING_CONFIG);
    const aboutY = useSpring(useTransform(scrollYProgress, [SCROLL_RANGES.ABOUT_START, SCROLL_RANGES.ABOUT_END], [30, 0]), SPRING_CONFIG);

    // Background animations
    const imageScale = useSpring(useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], [1, 0.85]), SPRING_CONFIG);
    const glowScale = useSpring(useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], [1, 0.8]), SPRING_CONFIG);
    const iconOpacity = useSpring(useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], [1, 0]));
    const centerScratchOpacity = useSpring(useTransform(scrollYProgress, [0, SCROLL_RANGES.HERO_END], [1, 0]));

    return (
        <section ref={heroRef} className="relative min-h-[200vh] bg-black" id="hero">
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Background Effects */}
                <Background
                    imageScale={imageScale}
                    glowScale={glowScale}
                    iconOpacity={iconOpacity}
                />

                {/* Hero Title */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-8 lg:pt-6 px-4">
                    <motion.h1
                        style={{ x: heroX, y: heroY, scale: heroScale }}
                        className="text-white font-bold text-4xl lg:text-8xl text-center"
                    >
                        {personalInfo.name}
                    </motion.h1>

                    {/* Center Scratch */}
                    <motion.div
                        className="mt-20 block lg:hidden"
                        style={{ opacity: centerScratchOpacity }}
                    >
                        <HandDrawnScratch
                            scratch={scratchPaths.path1}
                            className="relative"
                            delay={1}
                        />
                    </motion.div>
                </div>

                {/* About Section */}
                <AboutSection opacity={aboutOpacity} y={aboutY} />
            </div>
        </section>
    );
}

function Background({ imageScale, glowScale, iconOpacity, centerScratchOpacity }) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Ambient Blurs */}
            <div className="absolute w-64 h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl top-20 -left-20 animate-pulse" />
            <div className="absolute w-64 h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse" />

            {/* Scratches */}
            {SCRATCHES.map((scratch, i) => (
                <HandDrawnScratch key={i} {...scratch} />
            ))}

            {/* Hero Image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
                <motion.img
                    src={HeroImage}
                    alt="Hero"
                    className="w-60 md:w-80 lg:w-96 origin-bottom"
                    style={{ scale: imageScale }}
                />
            </div>

            {/* Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    className="w-60 h-60 md:w-72 md:h-72 lg:w-[30rem] lg:h-[30rem] rounded-full blur-2xl origin-bottom bg-cyan-500/50"
                    style={{ scale: glowScale }}
                />
            </div>

            {/* Bouncing Icons */}
            {BOUNCING_ICONS.map((icon) => (
                <BouncingIcon key={icon.id} {...icon} opacity={iconOpacity} />
            ))}
        </div>
    );
}

function BouncingIcon({ className, duration, delay, path, opacity }) {
    return (
        <motion.div
            className={`absolute w-12 h-12 lg:w-16 lg:h-16 z-30 hidden lg:block ${className}`}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
            style={{ opacity }}
        >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                </svg>
            </div>
        </motion.div>
    );
}

function AboutSection({ opacity, y }) {
    return (
        <motion.div
            style={{ opacity, y, pointerEvents: opacity }}
            className="absolute inset-0 z-20 flex items-start pt-32 sm:pt-36 lg:pt-28 lg:pt-32"
        >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 flex flex-col gap-8 lg:gap-20" id='about'>

                {/* Header */}
                <div className="text-center pointer-events-none">
                    <h3 className="text-white text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
                        <span className="text-cyan-400">01.</span> About Me
                    </h3>
                    <div className="w-16 lg:w-20 h-1 bg-cyan-500 mx-auto mb-4 lg:mb-6" />
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4">

                    {/* Left Column */}
                    <div className="space-y-4 lg:space-y-6 w-full lg:max-w-sm lg:pt-15">
                        <TypingText />

                        <div className="flex gap-3 lg:gap-4 justify-center lg:justify-start mt-4">
                            {SOCIAL_LINKS.map((social, i) => (
                                <SocialLink key={i} icon={social.icon} href={social.href} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 lg:space-y-8 w-full lg:max-w-sm text-center lg:text-justify">
                        <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                            {personalInfo.bio}
                        </p>
                        <div className="space-y-3 lg:space-y-4 hidden lg:block">
                            {QUICK_LINKS.map((link) => (
                                <QuickLink key={link.href} {...link} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SocialLink({ icon: Icon, href }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 lg:p-3 border border-gray-700 rounded-lg hover:border-cyan-400 hover:text-cyan-400 text-gray-300"
        >
            <Icon />
        </motion.a>
    );
}

function QuickLink({ href, label }) {
    return (
        <div className="relative w-full group">
            <a
                href={href}
                className="flex justify-center lg:justify-between items-center gap-2 text-white text-sm lg:text-base transition-colors hover:text-cyan-400"
            >
                {label}
                <svg
                    className="w-8 h-8 rotate-45 transition-transform duration-300 group-hover:rotate-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-cyan-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </div>
    );
}