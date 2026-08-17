"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, ExternalLink } from 'lucide-react';

interface ReelModalProps {
    isOpen: boolean;
    reelUrl: string;
    onClose: () => void;
}

const ReelModal: React.FC<ReelModalProps> = ({ isOpen, reelUrl, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-md aspect-[9/16] bg-[#0f0f0f] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Instagram branding header */}
                        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                                <Instagram size={18} className="text-white" />
                            </div>
                            <span className="text-white font-semibold text-sm">@masalamist_sok</span>
                        </div>

                        {/* Reel embed container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <blockquote
                                className="instagram-media w-full h-full"
                                data-instgrm-permalink={reelUrl}
                                data-instgrm-version="14"
                                style={{ background: '#000', border: '0', borderRadius: '0', margin: '0', padding: '0', width: '100%', height: '100%' }}
                            >
                            </blockquote>
                        </div>

                        {/* Fallback if embed doesn't load */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
                            <div className="w-20 h-20 rounded-full bg-[#c5a059]/20 backdrop-blur-sm border-2 border-[#c5a059]/40 flex items-center justify-center mb-6">
                                <Instagram size={40} className="text-[#c5a059]" />
                            </div>
                            <p className="text-white text-center px-8 mb-6">
                                View this reel on Instagram
                            </p>
                            <a
                                href={reelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                <ExternalLink size={18} />
                                Open in Instagram
                            </a>
                        </div>

                        {/* View on Instagram CTA */}
                        <div className="absolute bottom-6 left-6 right-6 z-30">
                            <a
                                href={reelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                            >
                                <ExternalLink size={18} />
                                View on Instagram
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReelModal;
