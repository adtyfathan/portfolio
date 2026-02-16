import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../mockData";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
    const ref = useRef(null);
    const scrollContainerRef = useRef(null);
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const autoPlayIntervalRef = useRef(null);

    const isInView = useInView(ref, {
        once: false,
        margin: "-100px 0px -100px 0px",
    });

    // Auto-play carousel with interval
    useEffect(() => {
        const startAutoPlay = () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
            autoPlayIntervalRef.current = setInterval(() => {
                setActiveProjectIndex((prevIndex) =>
                    (prevIndex + 1) % projects.length
                );
            }, 5000); // Change project every 5 seconds
        };

        startAutoPlay();

        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, []);

    // Auto-scroll carousel container to center active card
    useEffect(() => {
        const timer = setTimeout(() => {
            const activeCard = scrollContainerRef.current?.querySelector(
                `[data-project-index="${activeProjectIndex}"]`
            );
            if (activeCard && scrollContainerRef.current) {
                if (activeCard && scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const cardLeft = activeCard.offsetLeft;
                    const cardWidth = activeCard.offsetWidth;
                    const containerWidth = container.offsetWidth;

                    container.scrollTo({
                        left: cardLeft - containerWidth / 2 + cardWidth / 2,
                        behavior: "smooth",
                    });
                }
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [activeProjectIndex]);



    const activeProject = projects[activeProjectIndex];

    return (
        <section
            id="projects"
            className="relative min-h-screen bg-black overflow-hidden"
            ref={ref}
        >
            {/* Dynamic background with active project image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeProjectIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                </motion.div>
            </AnimatePresence>

            {/* Content overlay */}
            <div className="relative z-10 h-screen flex flex-col justify-between py-20">
                {/* Top content - constrained width */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="text-cyan-400">04.</span> Featured Projects
                        </h2>
                        <div className="w-20 h-1 bg-cyan-500" />
                    </motion.div>

                    {/* Active Project Info */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`info-${activeProjectIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl mt-8"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {activeProject.title}
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                {activeProject.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {activeProject.technologies.map((tech, techIndex) => (
                                    <span
                                        key={techIndex}
                                        className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-full text-sm font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Action Links */}
                            <div className="flex items-center gap-6">
                                <motion.a
                                    href={activeProject.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Github size={20} />
                                    <span>View Code</span>
                                </motion.a>

                                {/* <motion.a
                                    href={activeProject.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors text-base font-medium"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ExternalLink size={20} />
                                    <span>Live Demo</span>
                                </motion.a> */}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Auto-Sliding Carousel Cards - Full Width */}
                <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                    {/* Left fade overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none" />
                    
                    {/* Right fade overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none" />

                    <motion.div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                data-project-index={index}
                                onClick={() => {
                                    setActiveProjectIndex(index);
                                    // Restart interval on click
                                    if (autoPlayIntervalRef.current) {
                                        clearInterval(autoPlayIntervalRef.current);
                                    }
                                    autoPlayIntervalRef.current = setInterval(() => {
                                        setActiveProjectIndex((prevIdx) =>
                                            (prevIdx + 1) % projects.length
                                        );
                                    }, 5000);
                                }}
                                className={`flex-shrink-0 w-80 h-48 rounded-lg cursor-pointer transition-all duration-300 ${
                                    activeProjectIndex === index
                                        ? "shadow-lg shadow-cyan-400/75"
                                        : "border border-gray-700 hover:border-gray-500 opacity-30 hover:opacity-75"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-800">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-all duration-500 ${
                                            activeProjectIndex === index
                                                ? "scale-110"
                                                : "scale-100"
                                        }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    {/* Card Title Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h4 className="text-white font-bold text-lg">
                                            {project.title}
                                        </h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Custom scrollbar hide styles */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Projects;
