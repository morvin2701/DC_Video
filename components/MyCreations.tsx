/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { AspectRatio } from '../types';
import { ArrowDown, FilmIcon, Sparkles } from 'lucide-react';
import {
    ArrowPathIcon,
    FramesModeIcon,
    TextModeIcon,
} from './icons';

interface Creation {
    id: string;
    prompt: string;
    thumbnail: string; // Using colors/gradients for now since we don't have real images
    date: string;
    ratio: AspectRatio;
    type: 'text' | 'image';
    duration: string;
}

const MOCK_CREATIONS: Creation[] = [
    {
        id: '1',
        prompt: 'A futuristic cyberpunk city at night with neon lights reflecting on wet pavement.',
        thumbnail: 'bg-gradient-to-br from-indigo-900 to-purple-900',
        date: '2 mins ago',
        ratio: AspectRatio.LANDSCAPE,
        type: 'text',
        duration: '00:05'
    },
    {
        id: '2',
        prompt: 'Portrait of a warrior in golden armor standing in a desert storm.',
        thumbnail: 'bg-gradient-to-br from-yellow-900 to-orange-900',
        date: '1 hour ago',
        ratio: AspectRatio.PORTRAIT,
        type: 'image',
        duration: '00:08'
    },
    {
        id: '3',
        prompt: 'Underwater coral reef with bioluminescent fish swimming in circles.',
        thumbnail: 'bg-gradient-to-br from-blue-900 to-cyan-900',
        date: '3 hours ago',
        ratio: AspectRatio.LANDSCAPE,
        type: 'text',
        duration: '00:10'
    },
    {
        id: '4',
        prompt: 'Time-lapse of a flower blooming in a magical forest.',
        thumbnail: 'bg-gradient-to-br from-green-900 to-emerald-900',
        date: '1 day ago',
        ratio: AspectRatio.PORTRAIT,
        type: 'text',
        duration: '00:04'
    },
    {
        id: '5',
        prompt: 'Cinematic drone shot of the Swiss Alps covered in snow.',
        thumbnail: 'bg-gradient-to-br from-gray-900 to-slate-800',
        date: '2 days ago',
        ratio: AspectRatio.LANDSCAPE,
        type: 'image',
        duration: '00:12'
    },
    {
        id: '6',
        prompt: 'Abstract geometric shapes floating in zero gravity.',
        thumbnail: 'bg-gradient-to-br from-pink-900 to-rose-900',
        date: '1 week ago',
        ratio: AspectRatio.SQUARE,
        type: 'text',
        duration: '00:06'
    }
];

const MyCreations: React.FC = () => {
    const [filter, setFilter] = useState<'ALL' | 'text' | 'image'>('ALL');

    const filteredCreations = MOCK_CREATIONS.filter(item =>
        filter === 'ALL' ? true : item.type === filter
    );

    return (
        <div className="w-full animation-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">My Creations</h2>
                    <p className="text-gray-400">Manage and download your generated videos.</p>
                </div>

                <div className="flex bg-[#1f1f1f] p-1 rounded-xl self-start md:self-auto">
                    {(['ALL', 'text', 'image'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === f
                                    ? 'bg-[#2c2c2e] text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            {f === 'ALL' && 'All Videos'}
                            {f === 'text' && <><TextModeIcon className="w-4 h-4" /> Text to Video</>}
                            {f === 'image' && <><FramesModeIcon className="w-4 h-4" /> Image to Video</>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreations.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-[#151515] border border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
                    >
                        {/* Thumbnail / Preview Area */}
                        <div className={`w-full aspect-video ${item.thumbnail} relative`}>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Duration Badge */}
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-medium text-white border border-white/10 backdrop-blur-sm">
                                {item.duration}
                            </span>

                            {/* Type Badge */}
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-medium text-white border border-white/10 backdrop-blur-sm flex items-center gap-1">
                                {item.type === 'text' ? <Sparkles className="w-3 h-3 text-indigo-400" /> : <FilmIcon className="w-3 h-3 text-pink-400" />}
                                {item.type === 'text' ? 'TXT' : 'IMG'}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-gray-300 text-sm font-medium line-clamp-2 leading-relaxed mb-2">
                                        "{item.prompt}"
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {item.date} • {item.ratio === AspectRatio.LANDSCAPE ? '16:9' : item.ratio === AspectRatio.PORTRAIT ? '9:16' : '1:1'}
                                    </p>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-2">
                                <button className="text-xs font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                                    <ArrowPathIcon className="w-3.5 h-3.5" />
                                    Remix
                                </button>
                                <button className="text-xs font-medium text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                                    <ArrowDown className="w-3.5 h-3.5" />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCreations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <div className="w-16 h-16 rounded-full bg-[#1f1f1f] flex items-center justify-center mb-4">
                        <FilmIcon className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="text-lg font-medium">No creations found</p>
                    <p className="text-sm opacity-60">Try changing your filters</p>
                </div>
            )}
        </div>
    );
};

export default MyCreations;
