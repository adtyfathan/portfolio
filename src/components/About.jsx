import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '../mockData';
import { Github, Linkedin, Twitter, Mail, ArrowDown } from 'lucide-react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToAbout = () => {
        const element = document.querySelector('#about');
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="about" className="py-20 bg-black" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-cyan-400">01.</span> About Me
                    </h2>
                    <div className="w-20 h-1 bg-cyan-500 mb-12"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                            {personalInfo.bio}
                        </p>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                            I specialize in creating exceptional digital experiences that are fast, accessible, and visually appealing.
                            My goal is to always build products that provide pixel-perfect, performant experiences.
                        </p>

                        <motion.div
                            className="flex items-center justify-center gap-4 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.a
                                href={personalInfo.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Github className="text-gray-300 hover:text-cyan-400" size={24} />
                            </motion.a>
                            <motion.a
                                href={personalInfo.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Linkedin className="text-gray-300 hover:text-cyan-400" size={24} />
                            </motion.a>
                            <motion.a
                                href={personalInfo.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Twitter className="text-gray-300 hover:text-cyan-400" size={24} />
                            </motion.a>
                            <motion.a
                                href={`mailto:${personalInfo.email}`}
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Mail className="text-gray-300 hover:text-cyan-400" size={24} />
                            </motion.a>
                        </motion.div>

                        <motion.button
                            onClick={scrollToAbout}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore My Work
                            <ArrowDown size={20} className="animate-bounce" />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-25 group-hover:opacity-40 blur transition-opacity"></div>
                            <div className="relative bg-gray-900 rounded-lg p-8 border border-gray-800">
                                <div className="w-full aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl md:text-7xl font-bold text-cyan-400 mb-2">5+</div>
                                        <div className="text-gray-400 text-lg">Years of Experience</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;