import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Aditya Fathan</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Github size={16} />
                        <span>© 2026 All rights reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;