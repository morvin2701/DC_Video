/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { AspectRatio } from '../types';
import { SparklesIcon } from './icons';

interface TrendingPrompt {
    id: string;
    title: string;
    prompt: string;
    ratio: AspectRatio;
    category: string;
}

const SAMPLE_PROMPTS: TrendingPrompt[] = [
    {
        id: '1',
        title: 'Cyberpunk City',
        prompt: 'A futuristic cyberpunk city at night with neon lights reflecting on wet pavement. Flying cars zooming past skyscrapers, holographic billboards displaying advertisements. Cinematic lighting, 8k resolution, photorealistic.',
        ratio: AspectRatio.LANDSCAPE,
        category: 'Sci-Fi'
    },
    {
        id: '2',
        title: 'Serene Nature Loop',
        prompt: 'A calm mountain lake at sunrise, mist rolling over the water, pine trees in the background. Ultra-realistic, 4k, peaceful atmosphere.',
        ratio: AspectRatio.PORTRAIT,
        category: 'Nature'
    },
    {
        id: '3',
        title: 'Abstract Fluid Art',
        prompt: 'Swirling colorful fluids mixing together in slow motion, gold and obsidian liquids. Macro shot, high detail, studio lighting.',
        ratio: AspectRatio.PORTRAIT,
        category: 'Abstract'
    },
    {
        id: '4',
        title: 'Space Exploration',
        prompt: 'An astronaut standing on the edge of a crater on Mars, looking at Earth in the distant sky. Dust storms swirling, cinematic composition.',
        ratio: AspectRatio.LANDSCAPE,
        category: 'Space'
    },
    {
        id: '5',
        title: 'Underwater World',
        prompt: 'Coral reef teeming with colorful fish, sun rays penetrating through the blue water. 4k, detailed texture.',
        ratio: AspectRatio.LANDSCAPE,
        category: 'Nature'
    },
    {
        id: '6',
        title: 'Vertical Fashion',
        prompt: 'A fashion model walking down a runway in a futuristic outfit made of light. High fashion, bright lights, slow motion.',
        ratio: AspectRatio.PORTRAIT,
        category: 'Fashion'
    },
    {
        id: '7',
        title: 'Snowy Himalayan Hike',
        prompt: 'Cinematic wide shot of hikers trekking through the snow-capped mountains of Rohtang Pass. Sunlight filtering through the peaks, pristine white snow, crystal clear blue sky. 4k, travel documentary style.',
        ratio: AspectRatio.LANDSCAPE,
        category: 'Travel'
    },
    {
        id: '8',
        title: 'Ladakh Bike Expedition',
        prompt: 'First-person view from a motorcycle riding through the rugged terrain of Ladakh. Winding roads, barren mountains, and flags fluttering in the wind. High speed, action camera style.',
        ratio: AspectRatio.LANDSCAPE,
        category: 'Adventure'
    },
    {
        id: '9',
        title: 'Pamban Bridge Journey',
        prompt: 'View from a train window crossing the Pamban Bridge in Rameswaram. endless blue ocean on both sides, waves crashing against the pillars. Nostalgic, cinematic lighting.',
        ratio: AspectRatio.PORTRAIT,
        category: 'Travel'
    },
    {
        id: '10',
        title: 'Sissu Waterfall',
        prompt: 'Drone shot revealing the majestic Sissu waterfall in Lahaul valley, surrounded by autumn foliage and snow peaks. misty atmosphere, slow motion water.',
        ratio: AspectRatio.PORTRAIT,
        category: 'Nature'
    }
];

interface TrendingPromptsProps {
    onSelectPrompt: (prompt: string, ratio: AspectRatio) => void;
}

const TrendingPrompts: React.FC<TrendingPromptsProps> = ({ onSelectPrompt }) => {
    const [filter, setFilter] = useState<'ALL' | AspectRatio>('ALL');

    const filteredPrompts = SAMPLE_PROMPTS.filter(p =>
        filter === 'ALL' ? true : p.ratio === filter
    );

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Trending Prompts</h2>
                    <p className="text-gray-400">Discover popular video concepts from the community.</p>
                </div>

                <div className="flex bg-[#1f1f1f] p-1 rounded-xl">
                    {['ALL', AspectRatio.LANDSCAPE, AspectRatio.PORTRAIT].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                ? 'bg-[#2c2c2e] text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            {f === 'ALL' ? 'All' : f === AspectRatio.LANDSCAPE ? '16:9 Landscape' : '9:16 Mobile'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelectPrompt(item.prompt, item.ratio)}
                        className="group relative bg-[#151515] border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${item.ratio === AspectRatio.LANDSCAPE
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                }`}>
                                {item.ratio === AspectRatio.LANDSCAPE ? 'Landscape' : 'Portrait'}
                            </span>
                            <span className="text-xs text-gray-500">{item.category}</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-200 mb-3 group-hover:text-white transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                            "{item.prompt}"
                        </p>

                        <div className="flex items-center text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                            <SparklesIcon className="w-4 h-4 mr-2" />
                            Try this prompt
                        </div>

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingPrompts;
