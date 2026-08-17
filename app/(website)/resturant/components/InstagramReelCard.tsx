"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';

interface InstagramReelCardProps {
    reelUrl: string;
    thumbnail?: string;
    title?: string;
    views?: string;
    index: number;
    onOpen: (reelUrl: string) => void;
}

const InstagramReelCard: React.FC<InstagramReelCardProps> = ({
    reelUrl,
    thumbnail,
    title,
    views,
    index,
    onOpen
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="group relative aspect-[9/16] overflow-hidden cursor-pointer bg-[#0f0f0f]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onOpen(reelUrl)}
        >
            {/* Thumbnail/Video Background */}
            {thumbnail ? (
                <img
                    src={thumbnail}
                    alt={title || 'Instagram Reel'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.15)_0%,transparent_70%)]"></div>
                    </div>
                </div>
            )}

            {/* Subtle dark gradient overlay at bottom */}
            <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                style={{ opacity: isHovered ? 0.7 : 0.5 }}
            />

            {/* Centered play button - appears on hover */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    animate={{ scale: isHovered ? 1 : 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <Play size={28} className="text-white fill-white ml-1" />
                </motion.div>
            </motion.div>

            {/* Bottom-left view count overlay */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                <motion.div
                    className="flex items-center gap-1.5 text-white"
                    animate={{ opacity: isHovered ? 1 : 0.9 }}
                >
                    <Eye size={14} />
                    <span className="text-sm font-medium">{views || '0'}</span>
                </motion.div>
            </div>

            {/* Hover darken effect */}
            <motion.div
                className="absolute inset-0 bg-black/20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
};

export default InstagramReelCard;
