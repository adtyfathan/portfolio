import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../mockData';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="py-20 bg-gray-900" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-cyan-400">06.</span> Get In Touch
                    </h2>
                    <div className="w-20 h-1 bg-cyan-500 mb-12"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Let's work together
                        </h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            I'm always interested in hearing about new projects and opportunities.
                            Whether you have a question or just want to say hi, feel free to reach out!
                        </p>

                        <div className="space-y-6 mb-8">
                            <motion.div
                                className="flex items-center gap-4"
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-3 bg-cyan-500/10 rounded-lg">
                                    <Mail className="text-cyan-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Email</p>
                                    <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-cyan-400 transition-colors">
                                        {personalInfo.email}
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-4"
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-3 bg-cyan-500/10 rounded-lg">
                                    <Phone className="text-cyan-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Phone</p>
                                    <p className="text-white">{personalInfo.phone}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-4"
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-3 bg-cyan-500/10 rounded-lg">
                                    <MapPin className="text-cyan-400" size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Location</p>
                                    <p className="text-white">{personalInfo.location}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <motion.a
                                href={personalInfo.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Github className="text-gray-300 hover:text-cyan-400" size={20} />
                            </motion.a>
                            <motion.a
                                href={personalInfo.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Linkedin className="text-gray-300 hover:text-cyan-400" size={20} />
                            </motion.a>
                            <motion.a
                                href={personalInfo.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-gray-800 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Instagram className="text-gray-300 hover:text-cyan-400" size={20} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-black border border-gray-800 rounded-lg p-8"
                    >
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                                <Send size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;