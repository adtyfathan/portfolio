import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certificates } from '../mockData';
import { Award, Calendar, FileText } from 'lucide-react';

const Certificates = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="certificates" className="py-20 bg-black" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-cyan-400">05.</span> Certificates
                    </h2>
                    <div className="w-20 h-1 bg-cyan-500 mb-12"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0}}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col"
                        >
                            {/* Certificate Image */}
                            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                <img
                                    src={cert.certificates}
                                    alt={cert.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Certificate Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-4">
                                    {cert.title}
                                </h3>

                                {/* Issuer - Pinned to bottom */}
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="p-2 bg-cyan-500/10 rounded-lg flex-shrink-0">
                                        <img
                                            src={cert.image}
                                            alt={cert.issuer}
                                            className="w-6 h-6 object-contain"
                                        />
                                    </div>
                                    <p className="text-cyan-400 text-sm">{cert.issuer}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;