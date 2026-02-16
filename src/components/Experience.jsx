import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../mockData';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="py-20 bg-black" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-cyan-400">02.</span> Work Experience
                    </h2>
                    <div className="w-20 h-1 bg-cyan-500 mb-12"></div>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800"></div>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                {/* Timeline dot */}
                                <div className="hidden md:block absolute left-6 top-8 w-5 h-5 bg-cyan-500 rounded-full border-4 border-gray-900 z-10"></div>

                                <div className="md:ml-20">
                                    <motion.div
                                        className="bg-black border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                            <div>
                                                <div className='flex items-center gap-8'>
                                                    <img src={exp.image} alt="" className="h-12 w-12 object-cover rounded-lg" />
                                                    <div>
                                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
                                                            {exp.position}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                                            <Briefcase size={18} />
                                                            <span className="text-base md:text-lg font-medium">{exp.company}</span>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 text-gray-400 text-xs md:text-sm mt-2 md:mt-0">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} />
                                                    <span>{exp.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs md:text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;