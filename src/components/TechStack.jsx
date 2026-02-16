import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { techStack } from '../mockData';
import * as Icons from 'lucide-react';

const TechStack = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="tech-stack" className="py-20 bg-black" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-cyan-400">03.</span> Tech Stack
                    </h2>
                    <div className="w-20 h-1 bg-cyan-500 mb-12"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {techStack.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            className="rounded-lg p-6 hover:border-cyan-500/50 transition-colors"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                {category.category}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {category.technologies.map((tech, techIndex) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                                        className="group relative rounded-lg flex items-center justify-center p-4 transition-all cursor-pointer my-4"
                                        tabIndex={0}
                                    >
                                        {/* circular hover backdrop */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-25 h-25 rounded-full bg-cyan-400/70 opacity-0 scale-25 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                                        />

                                        {/* continuous staggered bounce (items take turns) */}
                                        <motion.div
                                            className="relative z-10 flex flex-col items-center justify-center gap-2 w-full"
                                            animate={isInView ? { y: [0, -10, 0] } : { y: 0 }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                repeatType: 'loop',
                                                ease: 'easeInOut',
                                                delay: categoryIndex * 0.15 + techIndex * 0.08
                                            }}
                                            whileHover={{ scale: 1.06 }}
                                        >
                                            <img src={tech.icon} alt={tech.name} className="w-full h-14 object-contain" />
                                            <span className="sr-only">{tech.name}</span>
                                        </motion.div>

                                        {/* popup with tech name — visible only on hover/focus */}
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-3 py-1 rounded-md text-xs font-medium opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-focus:opacity-100 z-20">
                                            {tech.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;